import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import OrderedMenu from "./OrderedMenu";

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public customer_name: string;

  @column()
  public status: string;

  @column()
  public total_price: number;

  @column()
  public tx_number: string;

  @column()
  public type: string;

  @column()
  public payment_method: string;

  @column()
  public paid: number;

  @column()
  public change: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => OrderedMenu)
  public ordered_menus: HasMany<typeof OrderedMenu>;
}
