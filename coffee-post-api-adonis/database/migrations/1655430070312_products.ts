import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title_product", 50).unique().notNullable();
      table.string("code_product", 10).unique().notNullable();
      table.string("slug", 50).unique().notNullable();
      table.string("thumbnail").nullable();
      table.integer("price").notNullable();
      table.integer("category_id").nullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
