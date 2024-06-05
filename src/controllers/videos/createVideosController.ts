import {Request, Response} from "express";
import {Resolutions, db} from "../../db/db";
import {ErrorsType} from "../../types/errors-type";
import {VideosDBType} from "../../types/videoDB-type";
import {BodyType} from "../../types/request-response-types";

export const createVideosController = (
    req: Request<any, any, BodyType>,
    res: Response<VideosDBType | ErrorsType>) => {
    const {title, author, availableResolutions} = req.body

    const errors: ErrorsType = {
        errorsMessages: []
    }

    if (!title || title.length > 40) {
        errors.errorsMessages.push({
            message: "Incorrect data title",
            field: "title"
        })
    }

    if (!author || author.length > 20) {
        errors.errorsMessages.push({
            message: "Incorrect data author",
            field: "author"
        })
    }

    if (!Array.isArray(availableResolutions) ||
        !availableResolutions.every(r => Object.values(Resolutions).includes(r))) {
        errors.errorsMessages.push({
            message: "Incorrect available resolutions",
            field: "availableResolutions"
        })
    }

    //Если длина массива = true вернем ошибку.
    if (errors.errorsMessages.length) {
        res.status(400).json(errors)
        return;
    }

    const createdAt = new Date()
    const publicationDate = new Date()
    publicationDate.setDate(createdAt.getDate() + 1)//+ 1 день

    let newVideo: VideosDBType = {
        id: Date.now() + Math.random(),
        title,
        author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt,
        publicationDate,
        availableResolutions
    }
    db.videos.push(newVideo)
    res.status(201).json(newVideo)
}