import {Request, Response} from "express";
import {AvailableResolutions, db} from "../../db/db";

export type ErrorsMessagesType = {
    message: string
    field: string
}

export type ErrorsType = {
    errorsMessages: ErrorsMessagesType[]
}
export const updateVideoController = (req: Request, res: Response) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }

    let videoID: number = +req.params.id;
    let video = db.videos.find(v => v.id === videoID);
    if (!video) {
        res.status(404).json()
        return
    }

    const title: string = req.body.title
    const author: string = req.body.author
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded
    const minAgeRestriction = req.body.minAgeRestriction
    const publicationDate = req.body.publicationDate

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
        !availableResolutions.every(r => Object.values(AvailableResolutions).includes(r))) {
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
    if (!dateTimeRegex.test(publicationDate)) {
        errors.errorsMessages.push({
            message: 'Incorrect data publicationDate',
            field: 'publicationDate'
        });
    }


    //Если длина массива = true вернем ошибку.
    if (errors.errorsMessages.length) {
        res.status(400).json(errors)
        errors.errorsMessages = [];
        return
    }

    //if перепишет нужные строки у нашего объекта
    if (video) {
        video.title = req.body.title
        video.author = req.body.author
        video.availableResolutions = req.body.availableResolutions
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction
        video.publicationDate = req.body.publicationDate
    }
    res.status(204).json(video)
}