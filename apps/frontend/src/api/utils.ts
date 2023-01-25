interface ErrorWithMessage {
  message: string;
}

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
  typeof error === "object" && error !== null && "message" in error && typeof error.message === "string";
