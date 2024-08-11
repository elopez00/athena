import Session from "@/service/Session";
import { redirect } from "next/navigation";

export function GET() {
    Session.destroy();
    redirect("/auth/signin");
}