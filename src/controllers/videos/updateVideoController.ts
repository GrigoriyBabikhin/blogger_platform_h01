import {Request, Response} from "express";
import {Resolutions, db} from "../../db/db";
import {ErrorsType} from "../../types/errors-type";
import {BodyType, ParamType} from "../../types/request-response-types";
import {VideosDBType} from "../../types/videoDB-type";


export const updateVideoController = (
    req: Request<ParamType, any, BodyType>,
    res: Response) => {

    const errors: ErrorsType = {
        errorsMessages: []
    }

    let videoID: number = +req.params.id;
    let video: VideosDBType | undefined = db.videos.find(v => v.id === videoID);
    if (!video) {
        res.status(404).json()
        return
    }

    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body

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
            message: 'error!!!!',
            field: 'availableResolution'
        })
    }

    if (typeof canBeDownloaded !== "boolean") {
        errors.errorsMessages.push({
            message: "Incorrect data canBeDownloaded",
            field: "canBeDownloaded"
        })
    }

    if (typeof minAgeRestriction !== "number" || minAgeRestriction <= 0 || minAgeRestriction >= 19) {
        errors.errorsMessages.push({
            message: "Incorrect data minAgeRestriction",
            field: "minAgeRestriction"
        })
    }

    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;
    const checkISO = dateTimeRegex.test(publicationDate)
    if (!checkISO) {
        errors.errorsMessages.push({
            message: 'Incorrect data publicationDate',
            field: 'publicationDate'
        });
    }


    //Если длина массива = true вернем ошибку
    if (errors.errorsMessages.length) {
        res.status(400).json(errors)
        return
    }

    //if перепишет нужные строки у нашего объекта
    //new Date(publicationDate) т.к это строка, мы преобразуем его к типу дата
    if (video) {
        video.title = title
        video.author = author
        video.availableResolutions = availableResolutions
        video.canBeDownloaded = canBeDownloaded
        video.minAgeRestriction = minAgeRestriction
        video.publicationDate = new Date(publicationDate)
    }
    res.status(204).json(video)
}

