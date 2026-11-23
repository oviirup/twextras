import { SigninForm } from "@/components/admin/auth/signin-form";

export default async function SigninPage({ searchParams }: PageProps<"/dashboard/signin">) {
  const { next } = await searchParams;
  const redirectTo =
    typeof next === "string" && next.startsWith("/dashboard") ? next : "/dashboard";

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <SigninForm redirectTo={redirectTo} />
    </main>
  );
}
