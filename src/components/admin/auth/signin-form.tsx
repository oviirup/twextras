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
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().trim().min(1, "Password is required"),
});

type SigninValues = z.infer<typeof signinSchema>;

const baseSigninValues: SigninValues = {
  username: "",
  password: "",
};

// signin-form --->

function SigninForm({ redirectTo }: SigninForm.Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: baseSigninValues,
  });
  const { isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    const { error } = await signIn.username({
      username: values.username,
      password: values.password,
    });
    if (error) {
      setError(error.message ?? "Sign in failed");
      return;
    }
    router.push(redirectTo);
    router.refresh();
  });

  const onGoogleSignin = async () => {
    setPending(true);
    setError(null);
    await signIn.social({ provider: "google", callbackURL: "/dashboard" });
    setPending(false);
  };

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
          onSubmit={onSubmit}
          className="flex flex-col gap-4">
          <Form.Group>
            <Form.Control
              name="username"
              render={({ field, fieldState }) => (
                <Form.Field>
                  <Form.Label>Username</Form.Label>
                  <InputGroup.Root>
                    <InputGroup.Addon>
                      <Icons.User />
                    </InputGroup.Addon>
                    <InputGroup.Input
                      {...field}
                      id={field.name}
                      type="text"
                      autoComplete="username"
                      placeholder="Enter your username"
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
          onClick={onGoogleSignin}>
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
namespace SigninForm {
  export type Props = { redirectTo: string };
}

// exports --->

export { SigninForm };
