"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import { updateProfileAction } from "@/modules/users/actions";

const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  username: z.string().trim().min(1, "Username is required").max(32),
});
type ProfileValues = z.infer<typeof profileSchema>;

// profile-details --->

function ProfileDetails({ user }: ProfileDetails.Props) {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, username: user.username },
  });
  const { isDirty } = form.formState;

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    startTransition(async () => {
      const result = await updateProfileAction(values);
      if ("error" in result && result.error) {
        setError(result.error);
        return;
      }
      form.reset(values);
      router.refresh();
    });
  });

  return (
    <Form.Root formContext={form} onSubmit={onSubmit} className="flex flex-col gap-4">
      <Form.Group className="**:slot-field-label:mx-1 **:slot-field-description:mx-1">
        <Form.Control
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field>
              <Form.Label>Username</Form.Label>
              <Input {...field} readOnly disabled aria-invalid={fieldState.invalid} />
              <Form.Description>Contact the admin to reassign the username.</Form.Description>
              <Form.Error />
            </Form.Field>
          )}
        />
        <Form.Control
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field>
              <Form.Label>Full name</Form.Label>
              <Input {...field} aria-invalid={fieldState.invalid} />
              <Form.Error />
            </Form.Field>
          )}
        />
      </Form.Group>
      {error ? <Form.Error>{error}</Form.Error> : null}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!isDirty || isPending}
          onClick={() => {
            setError(null);
            form.reset();
          }}>
          Revert
        </Button>
        <Button type="submit" size="sm" disabled={!isDirty || isPending}>
          {isPending ? (
            <Icons.Loading data-icon-start className="size-4 motion-safe:animate-spin" />
          ) : null}
          Save changes
          <Icons.Check data-icon-end />
        </Button>
      </div>
    </Form.Root>
  );
}
namespace ProfileDetails {
  export type Props = { user: { name: string; username: string } };
}

// exports --->

export { ProfileDetails };
