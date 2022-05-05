export function parseError(error: unknown) {
    if (error instanceof Error) {
        return error;
    }
    if (error instanceof Parse.Error) {
        return new Error(error.message);
    }
    if (typeof error === 'string') {
        return new Error(error);
    }
    if (typeof error === 'object') {
        return new Error(JSON.stringify(error));
    }
    return new Error(`Unknown error: ${error}`);
}
