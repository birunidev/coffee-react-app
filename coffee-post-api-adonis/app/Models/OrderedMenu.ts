import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";

export default class OrderedMenu extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public productId: number;

  @column()
  public transactionId: number;

  @column()
  public quantity: number;

  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  public product_data: Object;
  public product_id: Number;

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;
}
