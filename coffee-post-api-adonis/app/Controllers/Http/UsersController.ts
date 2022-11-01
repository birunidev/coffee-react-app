import Hash from "@ioc:Adonis/Core/Hash";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import CreateUserValidator from "App/Validators/CreateUserValidator";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.all();

      response.json({
        data: users,
        success: true,
        statusCode: 200,
      });
    } catch (error) {
      response.badRequest({
        ...error,
        message: error.message,
        success: false,
        statusCode: 400,
      });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const user = await User.find(params.id);
      if (!user) {
        throw Error("User is not found");
      }

      response.json({
        data: user,
        success: true,
        statusCode: 200,
      });
    } catch (error) {
      response.badRequest({
        ...error,
        message: error.message,
        success: false,
        statusCode: 400,
      });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateUserValidator);
      const hashedPassword = await Hash.make(payload.password);
      const user = await User.create({
        ...payload,
        role: request.all().role,
        password: hashedPassword,
        profile_picture: request.all().profile_picture,
        phone_number: request.all().phone_number,
      });

      response.json({
        data: user,
        statusCode: 200,
        success: true,
        message: "Create user successfully",
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

  public async update({ request, response, params }: HttpContextContract) {
    try {
      console.log(params.id);
      const user = await User.findBy("id", params.id);
      if (!user) {
        throw Error("User is not found");
      }
      let password = "";
      if (request.body().password) {
        password = await Hash.make(request.body().password);
      }

      user.merge({ ...request.all(), password });
      await user.save();
      response.json({
        data: user,
        statusCode: 200,
        success: true,
        message: "Update user successfully",
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

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const user = await User.find(params.id);
      if (!user) {
        throw Error("User is not found");
      }

      await user.delete();

      response.json({
        statusCode: 200,
        success: true,
        message: "Delete user successfully",
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
