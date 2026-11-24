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
import { signUp } from "@/lib/auth/client";
import { Icons } from "@/lib/icons";

const PASSWORD_RULES: Password.Ruleset.Rule[] = [
  { label: "At least 8 characters", rule: (val) => /.{8,}/.test(val) },
  { label: "Contains a number", rule: (val) => /\d/.test(val) },
  { label: "Contains a lowercase letter", rule: (val) => /[a-z]/.test(val) },
  { label: "Contains an uppercase letter", rule: (val) => /[A-Z]/.test(val) },
  { label: "Contains a symbol", rule: (val) => /[^a-zA-Z0-9]/.test(val) },
];

const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Full name is required"),
    username: z.string().trim().min(6, "At least 6 characters").max(32),
    email: z.email("Enter a valid email").trim(),
    password: z
      .string()
      .trim()
      .min(8, "At least 8 characters")
      .regex(/\d/, "Contains a number")
      .regex(/[a-z]/, "Contains a lowercase letter")
      .regex(/[A-Z]/, "Contains an uppercase letter")
      .regex(/[^a-zA-Z0-9]/, "Contains a symbol"),
    confirm_password: z.string().trim().min(1, "Confirm your password"),
  })
  .refine((v) => v.password === v.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type SignupValues = z.infer<typeof signupSchema>;

const baseSignupValues: SignupValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

// signup-form --->

function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: baseSignupValues,
  });
  const { isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    const { error } = await signUp.email({
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
    });
    if (error) {
      setError(error.message ?? "Sign up failed");
      return;
    }
    router.push("/dashboard/profile");
    router.refresh();
  });

  return (
    <Card.Root className="w-full max-w-sm gap-6 py-8 shadow-2xl">
      <Card.Header className="px-8">
        <Card.Title className="text-base">Create account</Card.Title>
        <Card.Description>Register for the admin dashboard</Card.Description>
      </Card.Header>
      <Card.Content className="px-8">
        <Form.Root formContext={form} id="signup-form" onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Field>
                  <Form.Label>Full name</Form.Label>
                  <InputGroup.Root>
                    <InputGroup.Addon>
                      <Icons.User />
                    </InputGroup.Addon>
                    <InputGroup.Input
                      {...field}
                      id={field.name}
                      autoComplete="name"
                      placeholder="Enter your full name"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup.Root>
                  <Form.Error />
                </Form.Field>
              )}
            />
            <Form.Control
              name="username"
              control={form.control}
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
                      autoComplete="off"
                      placeholder="Choose a username"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup.Root>
                  <Form.Error />
                </Form.Field>
              )}
            />
            <Form.Control
              name="email"
              control={form.control}
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
                      placeholder="Enter your email"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup.Root>
                  <Form.Error />
                </Form.Field>
              )}
            />
            <Form.Control
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Field>
                  <Form.Label>Password</Form.Label>
                  <Password.Root ruleset={PASSWORD_RULES}>
                    <InputGroup.Addon>
                      <Icons.Lock />
                    </InputGroup.Addon>
                    <Password.Input
                      {...field}
                      id={field.name}
                      autoComplete="new-password"
                      placeholder="Enter a password"
                      aria-invalid={fieldState.invalid}
                    />
                    <Password.Hover />
                    <Password.Reveal />
                  </Password.Root>
                  <Form.Error />
                </Form.Field>
              )}
            />
            <Form.Control
              name="confirm_password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Field>
                  <Form.Label>Confirm password</Form.Label>
                  <Password.Root>
                    <InputGroup.Addon>
                      <Icons.Lock />
                    </InputGroup.Addon>
                    <Password.Input
                      {...field}
                      id={field.name}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
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
        </Form.Root>
      </Card.Content>
      <Card.Footer className="flex-col gap-3 px-8">
        <Button type="submit" form="signup-form" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Icons.Loading className="animate-spin" /> : null}
          Sign up
        </Button>
        <span className="text-center text-sm text-muted-foreground">
          Have an account?{" "}
          <Link href="/dashboard/signin" className="font-medium text-foreground underline">
            Sign in
          </Link>
        </span>
      </Card.Footer>
    </Card.Root>
  );
}
namespace SignupForm {}

// exports --->

export { SignupForm };
