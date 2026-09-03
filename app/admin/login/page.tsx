import { redirect } from "next/navigation";
import { ADMIN_LOGIN_PATH } from "@/lib/admin/path";

export default function LegacyAdminLoginRedirect() {
  redirect(ADMIN_LOGIN_PATH);
}
