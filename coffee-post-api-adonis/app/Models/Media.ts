import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public filename: string;

  @column()
  public size: number;

  @column()
  public type: string;

  @column()
  public path: string;

  public media_url: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
