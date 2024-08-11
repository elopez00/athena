import User from "@/models/User";
import Environment from "@/util/Environment";
import { cookies } from "next/headers";
import PocketBase from "pocketbase";

export default class Session {
    private static _pbClient = new PocketBase(Environment.getValue("pbEndpoint"));
    public static readonly cookieName = "auth";

    public static exists(): boolean {
        const authCookie = cookies().get(this.cookieName);
        if (!authCookie) return false;

        this._pbClient.authStore.loadFromCookie(authCookie.value);
        return Boolean(this._pbClient.authStore.token && this._pbClient.authStore.isValid);
    }

    public static create(token: string): void {
        cookies().set(this.cookieName, token);
    }

    public static destroy(): void {
        cookies().delete(this.cookieName);
    }

    public static getUser(): User | null {
        if (!this.exists()) return null;
        return User.fromObject(this._pbClient.authStore.model);
    }
    
}