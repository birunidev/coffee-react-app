import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import OrderedMenu from "App/Models/OrderedMenu";
import Product from "App/Models/Product";
import Transaction from "App/Models/Transaction";
import TransactionValidator from "App/Validators/TransactionValidator";

export default class TransactionsController {
  public async index({ response }: HttpContextContract) {
    try {
      const transactions = await Transaction.query().preload("ordered_menus");

      response.json({
        data: transactions,
        statusCode: 200,
        success: true,
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

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      // validate request

      const payload = await request.validate(TransactionValidator);
      let total_price: number = 0;
      const tx_number: string =
        "CP" + Math.floor(Math.random() * 899999999 + 100000000);
      const transaction_with_same_tx_number = await Transaction.findBy(
        "tx_number",
        tx_number
      );

      if (transaction_with_same_tx_number) {
        throw Error("Error generating tx number, please try again");
      }

      const ordered_menus = request.body().ordered_menus;
      if (!ordered_menus || ordered_menus.length == 0) {
        throw Error("No menu ordered");
      }

      const result_promises = await Promise.all(
        ordered_menus.map(async (menu: OrderedMenu) => {
          const product = await Product.find(menu.productId);
          if (!product) {
            throw Error("No Product Found");
          }

          return (total_price += product.price * menu.quantity);
        })
      );
      total_price = result_promises[0];
      if (payload.paid < total_price) {
        throw Error("Your money is not enough");
      }
      let change = payload.paid - total_price;
      const transaction = await Transaction.create({
        ...payload,
        total_price,
        change,
        status: request.body().status || "PAID",
        tx_number,
      });

      await OrderedMenu.createMany(
        ordered_menus.map((menu: OrderedMenu) => {
          return {
            ...menu,
            transactionId: transaction.id,
          };
        })
      );

      response.json({
        data: transaction,
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.log(error);
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
      const transaction = await Transaction.query()
        .where("id", params.id)
        .preload("ordered_menus");

      response.json({
        data: transaction,
        statusCode: 200,
        success: true,
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

  public async edit({}: HttpContextContract) {}

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const transaction = await Transaction.find(params.id);

      if (!transaction) {
        throw Error("Transaction is not found");
      }

      transaction.merge({
        status: request.body().status,
        type: request.body().type,
        payment_method: request.body().payment_method,
        customer_name: request.body().customer_name,
      });
      await transaction.save();

      response.json({
        data: transaction,
        statusCode: 200,
        success: true,
        message: "Update Transaction Successfully ",
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

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const transaction = await Transaction.find(params.id);
      if (!transaction) {
        throw Error("Transaction is not found");
      }

      await transaction?.delete();

      response.json({
        statusCode: 200,
        success: true,
        message: "Delete Transaction Successfully ",
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
}
