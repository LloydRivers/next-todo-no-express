export const sendErrorResponse = (message, statusCode = 500) => {
  return new Response(message, { status: statusCode });
};
