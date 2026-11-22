"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { InputGroup } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Password } from "@/components/ui/password";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth/client";
import { Icons } from "@/lib/icons";

const signinSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().trim().min(1, "Password is required"),
});
type SigninValues = z.infer<typeof signinSchema>;

// signin-form --->

function SigninForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(values: SigninValues) {
    setError(null);
    const { error } = await signIn.email(values);
    if (error) {
      setError(error.message ?? "Sign in failed");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogle() {
    setPending(true);
    setError(null);
    await signIn.social({ provider: "google", callbackURL: "/dashboard" });
    setPending(false);
  }

  return (
    <Card.Root className="w-full max-w-sm gap-6 py-8 shadow-2xl">
      <Card.Header className="px-8">
        <Card.Title className="text-base">Sign in</Card.Title>
        <Card.Description>Access the admin dashboard</Card.Description>
      </Card.Header>
      <Card.Content className="px-8">
        <Form.Root
          formContext={form}
          id="signin-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4">
          <Form.Group>
            <Form.Control
              name="email"
              render={({ field, fieldState }) => (
                <Form.Field>
                  <Form.Label>Email</Form.Label>
                  <InputGroup.Root>
                    <InputGroup.Addon>
                      <Icons.Mail />
                    </InputGroup.Addon>
                    <InputGroup.Input
                      {...field}
                      id={field.name}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup.Root>
                  <Form.Error />
                </Form.Field>
              )}
            />
            <Form.Control
              name="password"
              render={({ field, fieldState }) => (
                <Form.Field>
                  <Form.Label>Password</Form.Label>
                  <Password.Root>
                    <InputGroup.Addon>
                      <Icons.Lock />
                    </InputGroup.Addon>
                    <Password.Input
                      {...field}
                      id={field.name}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      aria-invalid={fieldState.invalid}
                    />
                    <Password.Reveal />
                  </Password.Root>
                  <Form.Error />
                </Form.Field>
              )}
            />
          </Form.Group>
          {error ? <Form.Error className="mt-4">{error}</Form.Error> : null}

          <Button type="submit" form="signin-form" disabled={isSubmitting}>
            Sign in
          </Button>
        </Form.Root>
      </Card.Content>
      <Separator className="relative mx-6 w-auto">
        <span className="bg-card px-2 text-xs leading-none text-muted-foreground absolute-center">
          OR
        </span>
      </Separator>
      <Card.Footer className="flex-col gap-3 px-8">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={pending}
          onClick={handleGoogle}>
          <Icons.Google />
          Login with Google
        </Button>
        <span className="text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link href="/dashboard/signup" className="font-medium text-foreground underline">
            Sign up
          </Link>
        </span>
      </Card.Footer>
    </Card.Root>
  );
}
namespace SigninForm {}

// exports --->

export { SigninForm };
