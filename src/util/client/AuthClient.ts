import { ClientResponseError} from "pocketbase";
import PocketBase from "pocketbase";
import Environment from "@/util/Environment";
import {FailedToUpdateError, UserAlreadyAuthenticatedError} from "@/util/errors";
import User from "@/models/User";

export default class AuthClient {
    /**
     * Client for admin console
     */
    private static readonly _pbClient = new PocketBase(Environment.getClientValue("pbEndpoint"));
    
    /**
     * Determines if we have a session
     */
    public static hasSession(): boolean {
        return Boolean(this._pbClient.authStore.token && this._pbClient.authStore.isValid);
    }

    public static getHeaders(): Headers {
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${this._pbClient.authStore.token}`);
        return headers;
    }

    /**
     * Gets the user object
     * 
     * @returns User object if user is authenticated, null otherwise
     */
    public static getUser(): User | null {
        return User.fromObject(this._pbClient.authStore.model);
    }
    
    /**
     * Logs in user
     *
     * @throws FailedToUpdateError
     * @throws UserAlreadyAuthenticatedError
     * @throws ClientResponseError
     */
    public static async signin(): Promise<string> {
        // check if we even need to create a session
        if (this.hasSession()) {
            throw new UserAlreadyAuthenticatedError()
        }
        
        // get auth data from login
        const authData = await this._pbClient.collection('users').authWithOAuth2({ provider: "google" });

        // define users
        const recordUser = User.fromObject(authData.record)!;
        const metaUser = User.fromObject({
            name: authData.meta?.name,
            avatar: authData.meta?.avatarUrl,
        });
        
        // set name if applicable
        await recordUser?.saveDifference(metaUser);

        // set the cookie
        return this._pbClient.authStore.exportToCookie();
    }
    
    public static logout(): void {
        this._pbClient.authStore.clear();
    }
}