export const ERR_INVALID_CREDS_CODE = "ERR_INVALID_CREDENTIALS";
export const ERR_INVALID_CREDS_MSG = "Invalid email or password";

export const errorCreator = (err: unknown) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof Error) {
    if (err.message === ERR_INVALID_CREDS_CODE) {
      statusCode = 401;
      message = ERR_INVALID_CREDS_MSG;
    }
  }

  return Response.json(
    {
      statusCode,
      error: message,
    },
    {
      status: statusCode,
    },
  );
};
