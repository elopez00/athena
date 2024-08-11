export class FailedToUpdateError extends Error {
    constructor(updateAttempt: string, err: Error) {
        super(`Failed to update ${updateAttempt}`, {
            cause: err,
        });
    }
}