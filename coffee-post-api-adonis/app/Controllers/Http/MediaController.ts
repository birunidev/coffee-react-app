import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Application from "@ioc:Adonis/Core/Application";
import Media from "App/Models/Media";
import fs from "fs";
import mime from "mime-types";

export default class MediaController {
  private roundOff(value) {
    return Math.round(value * 100) / 100;
  }
  public async index({ response }) {
    try {
      const medias = await Media.all();

      const finalMedias = medias.map((media) => {
        return {
          id: media.id,
          filename: media.filename,
          media_url: `${process.env.API_URL}/media/download/${media.filename}`,
          size: media.size,
          type: media.type,
        };
      });

      response.json({
        data: finalMedias,
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
  public async store({ request, response }) {
    try {
      const postSchema = schema.create({
        media: schema.file({
          size: "2mb",
          extnames: ["jpg", "gif", "png"],
        }),
      });

      const payload = await request.validate({ schema: postSchema });

      await payload.media.move(Application.tmpPath("uploads"), {
        name: `${+new Date()}-${payload.media.data.clientName
          .split(" ")
          .join("-")
          .toLowerCase()}`,
      });

      const size = this.roundOff(
        fs.statSync(payload.media.filePath).size * 0.001
      );
      const type = mime.lookup(payload.media.filePath);
      const data = {
        filename: payload.media.fileName,
        path: payload.media.filePath,
        size,
        type,
      };

      const media = await Media.create(data);
      response.json({
        data: {
          ...media,
          id: media.id,
          media_url: `${process.env.API_URL}/media/download/${media.filename}`,
        },
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

  public async destroy({ response, params }) {
    try {
      const media = await Media.find(params.id);
      if (!media) {
        throw Error("Media is not found");
      }
      if (!fs.existsSync(media.path)) {
        throw Error("File is not found");
      }

      fs.unlinkSync(media.path);
      media.delete();

      response.json({
        message: "Delete media successfully",
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

  public async download({ params, response }: HttpContextContract) {
    try {
      const media = await Media.findBy("filename", params.filename);
      if (!media) {
        throw Error("Media is not found");
      }
      if (!fs.existsSync(media.path)) {
        media.delete();
        throw Error("File is not found");
      }
      response.download(media.path);
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
