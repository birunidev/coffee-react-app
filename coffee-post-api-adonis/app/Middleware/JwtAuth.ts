import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class JwtAuth {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {
      await auth.use("jwt").authenticate();
      await next();
    } catch (error) {
      response.unauthorized({
        success: false,
        statusCode: 401,
        message: error.message,
      });
    }
  }
}
