"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { pick } from "@oviirup/utils/object";
import { toSentenceCase } from "@oviirup/utils/string";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Sheet } from "@/components/ui/sheet";
import { Icons } from "@/lib/icons";
import { deleteUserAction, updateUserAction } from "@/modules/users/actions";
import { getUserRank } from "@/modules/users/utils";
import { UserRole, UserStatus } from "@/prisma/generated/enums";
import { useRemoveUser } from "./remove.modal";
import { UserRow } from "./table";

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

// manage-user-handle --->

// manage-user --->

function ManageUser({ user, trigger, isOwnProfile, actorRole }: ManageUser.Props) {
  const router = useRouter();

  const actorRank = getUserRank(actorRole);
  const currRank = getUserRank(user.role);
  const canManage = currRank >= actorRank;

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

  const onRemove = async () => {
    const result = await deleteUserAction(user.id);
    if ("error" in result && result.error) return result.error;
    setOpen(false);
    router.refresh();
    return null;
  };

  const RemoveUser = useRemoveUser({
    user,
    onSubmit: onRemove,
  });

  const triggerButton = useMemo(
    () =>
      trigger ?? (
        <Button variant="ghost" size="sm">
          <Icons.Edit />
          Modify
        </Button>
      ),
    [trigger],
  );

  return (
    <Sheet.Root open={open} onOpenChange={setOpen}>
      <Sheet.Trigger render={triggerButton} disabled={!canManage} />
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Modify User</Sheet.Title>
        </Sheet.Header>
        <div className="flex flex-col gap-6 overflow-y-auto px-6">
          <Form.Root
            formContext={form}
            id="modify-user-form"
            onSubmit={onSubmit}
            className="flex flex-col gap-4">
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
                    <Input {...field} aria-invalid={fieldState.invalid} disabled={!canManage} />
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
                    <Input {...field} aria-invalid={fieldState.invalid} disabled={!canManage} />
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
                    <Input
                      {...field}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      disabled={!canManage}
                    />
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
                      {...field}
                      onValueChange={field.onChange}
                      items={ROLE_OPTIONS}
                      disabled={!canManage || isOwnProfile}>
                      <Select.Trigger className="w-full">
                        <Select.Value />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Group>
                          {ROLE_OPTIONS.map((option) => (
                            <Select.Item
                              key={`role-item-${option.value}`}
                              value={option.value}
                              disabled={getUserRank(option.value) < actorRank}>
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
                      {...field}
                      onValueChange={field.onChange}
                      items={STATUS_OPTIONS}
                      disabled={!canManage || isOwnProfile}>
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

          <div className="flex flex-col items-start rounded-lg border border-destructive/25 bg-destructive/10 p-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-destructive">Danger Zone</span>
              <p className="text-sm text-muted-foreground">
                Deleting this user will permanently delete every piece of information about the user
                from the database.
              </p>
            </div>
            <button
              type="button"
              className="-mx-1 mt-3 rounded-sm px-1 py-0.5 font-medium text-destructive link"
              onClick={RemoveUser.open}
              disabled={!canManage || isOwnProfile}
              tabIndex={-1}>
              Delete user
            </button>
          </div>
        </div>

        <Sheet.Footer className="mt-auto flex-row justify-between gap-2">
          <div className="flex flex-1 justify-end gap-2">
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
          </div>
        </Sheet.Footer>
        <RemoveUser.Modal />
      </Sheet.Content>
    </Sheet.Root>
  );
}

namespace ManageUser {
  export type Props = {
    user: UserRow;
    trigger?: Sheet.Trigger.Props["render"];
    isOwnProfile?: boolean;
    actorRole: UserRole;
  };
}

// exports --->

export { ManageUser };
