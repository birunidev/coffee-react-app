import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "ordered_menus";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("product_id")
        .unsigned()
        .references("products.id")
        .onDelete("CASCADE");
      table
        .integer("transaction_id")
        .unsigned()
        .references("transactions.id")
        .onDelete("CASCADE");
      table.integer("quantity");
      table.string("description");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
