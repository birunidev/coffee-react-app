import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Category";
import CreateCategoryValidator from "App/Validators/CreateCategoryValidator";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    try {
      const categories = await Category.all();

      response.json({
        data: categories,
        success: true,
        statusCode: 200,
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
  public async show({ response, params }: HttpContextContract) {
    try {
      const category = await Category.find(params.id);

      if (!category) {
        throw Error("Category is not found");
      }

      response.json({
        data: category,
        success: true,
        statusCode: 200,
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
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateCategoryValidator);

      const category = await Category.create(payload);

      response.json({
        data: category,
        success: true,
        statusCode: 200,
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
      const payload = await request.validate(CreateCategoryValidator);

      const category = await Category.find(params.id);
      if (!category) {
        throw Error("Category is not found");
      }

      category.merge({ ...payload });
      await category.save();
      response.json({
        data: category,
        success: true,
        statusCode: 200,
        message: "Update category succesfully",
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
  public async destroy({ response, params }: HttpContextContract) {
    try {
      const category = await Category.find(params.id);

      if (!category) {
        throw Error("Category is not found");
      }
      await category.delete();
      response.json({
        success: true,
        statusCode: 200,
        message: "Delete category succesfully",
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
