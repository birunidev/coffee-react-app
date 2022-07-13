import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "media";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.double("size");
      table.string("type");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("size");
      table.dropColumn("type");
    });
  }
}
