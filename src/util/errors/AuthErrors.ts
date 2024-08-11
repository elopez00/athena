export class UserAlreadyAuthenticatedError extends Error {
    constructor() {
        super("User has already authenticated on the platform");
    }
}