import {Request, Response} from "express";
import {ErrorsType} from "../input-output-types/errors-type";
import {AvailableResolutions, db} from "../db/db";
import {VideosDBType} from "../input-output-types/videos-db-tupe";

export const createVideosController = (req: Request, res: Response) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }

    const title = req.body.title
    const author = req.body.author

    if (!title || title.length > 40 || typeof title !== "string") {
        errors.errorsMessages.push({
            message: "Incorrect data title",
            field: "title"
        })
    }

    if (!author || author.length > 20 || typeof author !== "string") {
        errors.errorsMessages.push({
            message: "Incorrect data author",
            field: "author"
        })
    }

    const availableResolutions = req.body.availableResolutions;
    if (!Array.isArray(availableResolutions) ||
        !availableResolutions.every(r => Object.values(AvailableResolutions).includes(r))) {
        errors.errorsMessages.push({
            message: "error!!!!",
            field: "availableResolutions"
        })
    }

    //Если длина массива = true вернем ошибку.
    if (errors.errorsMessages.length) {
        res.status(400).json(errors)
        errors.errorsMessages = [];
        return;
    }

    const createdAt = new Date()
    const publicationData = new Date()
    publicationData.setDate(createdAt.getDate() + 1)

    let newVideo: VideosDBType = {
        id: Date.now() + Math.random(),
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationData.toISOString(),
        availableResolutions: availableResolutions,
    }
    db.videos.push(newVideo)
    res.status(201).json(newVideo)
}