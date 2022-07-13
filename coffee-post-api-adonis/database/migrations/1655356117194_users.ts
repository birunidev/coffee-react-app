import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name", 50).notNullable();
      table.string("username", 50).notNullable();
      table.string("email", 50).unique().notNullable();
      table.string("password").notNullable();
      table.string("phone_number").nullable();
      table.string("profile_picture").nullable();
      table.enum("role", ["ADMIN", "USER"]).defaultTo("USER");
      table.string("bio").notNullable().defaultTo("CASHIER");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
