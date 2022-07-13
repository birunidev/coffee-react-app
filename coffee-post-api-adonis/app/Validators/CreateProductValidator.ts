import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    title_product: schema.string([
      rules.maxLength(50),
      rules.unique({ table: "products", column: "title_product" }),
    ]),
    code_product: schema.string([
      rules.maxLength(10),
      rules.unique({ table: "products", column: "code_product" }),
    ]),
    slug: schema.string([
      rules.maxLength(50),
      rules.unique({ table: "products", column: "slug" }),
    ]),
    thumbnail: schema.string([rules.url()]),
    price: schema.number(),
    category_id: schema.number(),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "title_product.maxLength": "Maximum character is 50",
    "slug.maxLength": "Maximum character is 50",
    "code_product.maxLength": "Maximum character is 10",
  };
}
