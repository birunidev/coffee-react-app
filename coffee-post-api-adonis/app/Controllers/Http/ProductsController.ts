import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Product from "App/Models/Product";
import CreateProductValidator from "App/Validators/CreateProductValidator";

export default class ProductsController {
  public async index({ response }: HttpContextContract) {
    try {
      const products = await Product.all();

      response.json({
        data: products,
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
      const payload = await request.validate(CreateProductValidator);

      const product = await Product.create(payload);

      response.json({
        data: product,
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

  public async show({ params, response }: HttpContextContract) {
    try {
      const product = await Product.find(params.id);

      if (!product) {
        throw Error("Product is not found");
      }

      response.json({
        data: product,
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
      const payload = await request.validate({
        schema: schema.create({
          title_product: schema.string([
            rules.maxLength(50),
            rules.unique({ table: "products", column: "title_product" }),
          ]),
          slug: schema.string([
            rules.maxLength(50),

            rules.unique({ table: "products", column: "slug" }),
          ]),
          code_product: schema.string([
            rules.maxLength(10),
            rules.unique({ table: "products", column: "code_product" }),
          ]),
        }),
      });
      const product = await Product.find(params.id);

      if (!product) {
        throw Error("Product is not found");
      }

      product.merge({ ...payload });
      await product.save();

      response.json({
        data: product,
        success: true,
        statusCode: 200,
        message: "Update product successfully",
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

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const product = await Product.find(params.id);
      if (!product) {
        throw Error("Product is not found");
      }

      response.json({
        success: true,
        statusCode: 200,
        message: "Delete product successfully",
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
