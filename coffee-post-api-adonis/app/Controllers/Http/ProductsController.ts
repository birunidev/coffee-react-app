import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Product from "App/Models/Product";
import CreateProductValidator from "App/Validators/CreateProductValidator";

export default class ProductsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const product_query = Product.query();
      let products;
      products = await product_query;

      const query_params = request.qs();
      if (query_params.category_id && query_params.category_id != 0) {
        products = await product_query.where(
          "category_id",
          parseInt(query_params.category_id)
        );
      }

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
      // const payload = await request.validate({
      //   schema: schema.create({
      //     title_product: schema.string([
      //       rules.maxLength(50),
      //       rules.unique({ table: "products", column: "title_product" }),
      //     ]),
      //     slug: schema.string([
      //       rules.maxLength(50),
      //       rules.unique({ table: "products", column: "slug" }),
      //     ]),
      //     code_product: schema.string([
      //       rules.maxLength(10),
      //       rules.unique({ table: "products", column: "code_product" }),
      //     ]),
      //   }),
      // });

      const product = await Product.find(params.id);
      const data = request.all();

      if (!product) {
        throw Error("Product is not found");
      }

      if (product?.title_product != data.title_product) {
        const sameTitle = await Product.findBy(
          "title_product",
          data.title_product
        );
        if (sameTitle) {
          throw Error("Title and slug is already registered");
        }
      }

      if (product?.code_product != data.code_product) {
        const sameCodeProduct = await Product.findBy(
          "code_product",
          data.code_product
        );
        if (sameCodeProduct) {
          throw Error("Code Product is already registered");
        }
      }

      product.merge({ ...data });
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
