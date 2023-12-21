import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import thousandSeparator from "../lib/thousandSeparator";
import { nanoid } from "nanoid";
import { BlockBlobClient } from "@azure/storage-blob";
import intoStream from "into-stream";

const prisma = new PrismaClient();

export default class TrashController {
  static async clientPage(req: Request, res: Response) {
    const trashes = await prisma.trash.findMany();

    res.render("pages/client/index", { trashes });
  }

  static async detailPage(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await prisma.trash.findUnique({
        where: {
          id: Number(req.params.id),
        },
        include: {
          user: true,
        },
      });
      if (result === null) {
        return next();
      }
      res.render("pages/client/detail", { trash: result });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/");
    }
  }

  static async dashboardPage(req: Request, res: Response) {
    const trashes = await prisma.trash.findMany({
      where: {
        userId: req.user["id"],
      },
    });

    res.render("pages/dashboard/index", { trashes });
  }

  static async editPage(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await prisma.trash.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      if (result === null) {
        return next();
      }
      res.render("pages/dashboard/edit", { trash: result });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/dashboard");
    }
  }

  static uploadPage(req: Request, res: Response) {
    res.render("pages/dashboard/upload");
  }

  static async upload(req: Request, res: Response) {
    const stream = intoStream(req.file.buffer);
    const streamLength = req.file.buffer.length;
    const blobName = `${nanoid()}-${req.file.originalname}`;
    const blobService = new BlockBlobClient(
      "DefaultEndpointsProtocol=https;AccountName=trashcashstorage;AccountKey=ShgprrHNAdpi74zHTl9dKdWUa/2lIoAaH4r6N1/fzr9lDTrPZvDv5jaXehoj33+fGWsuXKlLxslj+AStfALK8A==;EndpointSuffix=core.windows.net",
      "trashcash-storage-container",
      blobName
    );

    await blobService.uploadStream(stream, streamLength);

    await prisma.trash.create({
      data: {
        title: req.body.title,
        img: `https://trashcashstorage.blob.core.windows.net/trashcash-storage-container/${blobName}`,
        qty: parseInt(req.body.qty),
        price: thousandSeparator(parseInt(req.body.price)),
        category: req.body.category,
        desc: req.body.description,
        userId: req.user["id"],
      },
    });

    res.redirect("/dashboard");
  }

  static async search(req: Request, res: Response) {
    try {
      if (!req.body.search) {
        req.flash("error", "Kata kunci tidak boleh kosong");
        return res.redirect("/");
      }

      const result = await prisma.trash.findMany({
        where: {
          title: {
            contains: req.body.search,
          },
        },
      });

      res.render("pages/client/index", { trashes: result });
    } catch (error) {
      req.flash("error", "Terjadi kesalahan dalam mencari data");
      res.redirect("/");
    }
  }

  static async update(req: Request, res: Response) {
    await prisma.trash.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: req.body.title,
        img: req.file.filename,
        qty: parseInt(req.body.qty),
        price: thousandSeparator(parseInt(req.body.price)),
        category: req.body.category,
        desc: req.body.description,
      },
    });

    res.redirect("/dashboard");
  }

  static async delete(req: Request, res: Response) {
    await prisma.trash.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.redirect("/dashboard");
  }
}
