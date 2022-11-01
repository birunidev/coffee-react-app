import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import LoginValidator from "App/Validators/LoginValidator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";

export default class AuthController {
  public async login({ auth, response, request }) {
    try {
      const payload = await request.validate(LoginValidator);

      const user = await User.findBy("email", payload.email);
      if (!user) {
        throw Error("User with this email is not exist");
      }

      const isVerified = await Hash.verify(user.password, payload.password);
      if (!isVerified) {
        throw Error("Wrong Password! Try another");
      }
      const jwt = await auth.use("jwt").generate(user);

      response.cookie("refresh_token", jwt.refreshToken);

      response.json({
        success: true,
        statusCode: 200,
        message: "Login successful",
        access_token: jwt.accessToken,
      });
    } catch (error) {
      console.log(error);
      response.badRequest({
        ...error,
        message: error.message,
        statusCode: 400,
        success: false,
      });
    }
  }
  public async register({ auth, request, response }) {
    try {
      const payload = await request.validate(CreateUserValidator);
      const defaultRole = "USER";
      const hashedPassword = await Hash.make(payload.password);
      const user = await User.create({
        ...payload,
        role: defaultRole,
        password: hashedPassword,
      });

      const jwt = await auth.use("jwt").generate(user);

      response.cookie("refresh_token", jwt.refreshToken);

      response.json({
        access_token: jwt.accessToken,
        statusCode: 200,
        success: true,
        data: user,
      });
    } catch (error) {
      response.badRequest({
        ...error,
        message: error.message,
        statusCode: 400,
        success: false,
      });
    }
  }

  public async refresh({ auth, request, response }: HttpContextContract) {
    try {
      const refreshToken = request.cookie("refresh_token");
      if (!refreshToken) {
        throw Error("Unauthorized");
      }

      const token = await auth.use("jwt").loginViaRefreshToken(refreshToken);
      response.cookie("refresh_token", token.refreshToken);
      response.json({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
    } catch (error) {
      if (error.message == "Invalid refresh token") {
        error.message = "Unauthorized";
        response.clearCookie("refresh_token");
      }

      response.badRequest({
        ...error,
        message: error.message,
        statusCode: 400,
        success: false,
      });
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use("jwt").authenticate();
      const userPayloadFromJwt = auth.use("jwt").payload!;
      await auth.use("jwt").revoke();
      await Database.from("jwt_tokens")
        .where("user_id", userPayloadFromJwt.userId)
        .delete();
      response.clearCookie("refresh_token");
      response.json({
        success: true,
        statusCode: 200,
        message: "Successfully logout",
      });
    } catch (error) {
      response.badRequest({
        ...error,
        message: error.message,
        statusCode: 400,
        success: false,
      });
    }
  }
}
