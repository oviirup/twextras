"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { pick } from "@oviirup/utils/object";
import { toSentenceCase } from "@oviirup/utils/string";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Sheet } from "@/components/ui/sheet";
import { Icons } from "@/lib/icons";
import { updateUserAction } from "@/modules/users/actions";
import { UserRole, UserStatus } from "@/prisma/generated/enums";
import { useUserRow } from "./context";

const ROLE_OPTIONS = Object.values(UserRole).map((value) => ({
  value: value,
  label: toSentenceCase(value),
}));

const STATUS_OPTIONS = Object.values(UserStatus).map((value) => ({
  value: value,
  label: toSentenceCase(value),
}));

const modifySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  username: z.string().trim().min(1, "Username is required").max(32),
  email: z.email("Enter a valid email").trim(),
  role: z.enum(Object.values(UserRole)),
  status: z.enum(Object.values(UserStatus)),
});
type ModifyValues = z.infer<typeof modifySchema>;

// modify-user --->

function ModifyUser() {
  const user = useUserRow();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ModifyValues>({
    resolver: zodResolver(modifySchema),
    defaultValues: pick(user, ["name", "username", "email", "role", "status"]),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    startTransition(async () => {
      const result = await updateUserAction(user.id, { ...values });
      if ("error" in result && result.error) {
        setError(result.error);
        return;
      }
      setOpen(false);
      router.refresh();
    });
  });

  return (
    <Sheet.Root open={open} onOpenChange={setOpen}>
      <Sheet.Trigger render={<Button variant="ghost" size="sm" />}>
        <Icons.Edit />
        Modify
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Modify User</Sheet.Title>
        </Sheet.Header>
        <Form.Root
          formContext={form}
          id="modify-user-form"
          onSubmit={onSubmit}
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-6">
          <Form.Group className="**:slot-field-label:mx-1 **:slot-field-description:mx-1">
            <Form.Field>
              <Form.Label>User ID</Form.Label>
              <Input value={user.id} readOnly disabled />
              <Form.Description>User ID cannot be changed</Form.Description>
            </Form.Field>
            <Form.Control
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Field>
                  <Form.Label>Username</Form.Label>
                  <Input {...field} aria-invalid={fieldState.invalid} />
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
            <Form.Control
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Form.Field>
                  <Form.Label>Email</Form.Label>
                  <Input {...field} type="email" aria-invalid={fieldState.invalid} />
                  <Form.Error />
                </Form.Field>
              )}
            />
            <Form.Control
              name="role"
              control={form.control}
              render={({ field }) => (
                <Form.Field>
                  <Form.Label>Role</Form.Label>
                  <Select.Root
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    items={ROLE_OPTIONS}>
                    <Select.Trigger className="w-full">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Group>
                        {ROLE_OPTIONS.map((option) => (
                          <Select.Item key={`role-item-${option.value}`} value={option.value}>
                            {option.label}
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </Form.Field>
              )}
            />
            <Form.Control
              name="status"
              control={form.control}
              render={({ field }) => (
                <Form.Field>
                  <Form.Label>Status</Form.Label>
                  <Select.Root
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    items={STATUS_OPTIONS}>
                    <Select.Trigger className="w-full">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Group>
                        {STATUS_OPTIONS.map((option) => (
                          <Select.Item key={`status-item-${option.value}`} value={option.value}>
                            {option.label}
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </Form.Field>
              )}
            />
          </Form.Group>
          {error ? <Form.Error>{error}</Form.Error> : null}
        </Form.Root>
        <Sheet.Footer className="flex-row justify-end gap-2">
          <Sheet.Close render={<Button variant="outline" size="lg" icon />}>
            <span className="sr-only">Cancel</span>
            <Icons.Close />
          </Sheet.Close>
          <Button
            type="submit"
            form="modify-user-form"
            size="lg"
            disabled={isPending}
            className="flex-1 justify-between">
            {isPending ? <Icons.Loading className="size-4 motion-safe:animate-spin" /> : null}
            Save changes
            <Icons.Check />
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  );
}

// exports --->

export { ModifyUser };
