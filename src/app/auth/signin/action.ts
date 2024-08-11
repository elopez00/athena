"use server";

import { cookies } from "next/headers";

export default async function authenticate(cookie: string) {
    cookies().set("auth", cookie);
}