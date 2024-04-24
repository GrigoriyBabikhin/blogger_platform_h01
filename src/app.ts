import express, {Request, Response} from 'express'
import {SETTINGS} from "./settings";
import {type} from "node:os";

export const app = express()
app.use(express.json()) // добавление ко всем реквестам body и query

type VideosType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: AvailableResolutions[]
}

type ErrorsMessagesType = {
    message: string
    field: string
}

type ErrorsType = {
    errorsMessages: ErrorsMessagesType[]
}

const errors: ErrorsType = {
    errorsMessages: []
}

enum AvailableResolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160",
}

let videos: VideosType[] = [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2024-04-07T10:35:45.728Z",
        "publicationDate": "2024-04-07T10:35:45.728Z",
        "availableResolutions": [AvailableResolutions.P144]
    }
]

app.delete("/testing/all-data", (req: Request, res: Response) => {
    videos.length = 0
    res.status(204).json()
});

app.get(SETTINGS.PATH.VIDEOS, (req: Request, res: Response) => {
    res.status(200).json(videos)
});

app.post(SETTINGS.PATH.VIDEOS, (req: Request, res: Response) => {

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

    let newVideo: VideosType = {
        id: Date.now() + Math.random(),
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationData.toISOString(),
        availableResolutions: availableResolutions,
    }
    videos.push(newVideo)
    res.status(201).json(newVideo)
});

app.get(SETTINGS.PATH.VIDEOS + "/:id", (req: Request, res: Response) => {
    let videoID: number = +req.params.id;
    let video = videos.find(v => v.id === videoID);
    if (!video) {
        res.status(404).json('Video not found')
    }
    res.status(200).json(video)
});

app.put(SETTINGS.PATH.VIDEOS + "/:id", (req: Request, res: Response) => {

    let videoID: number = +req.params.id;
    let video = videos.find(v => v.id === videoID);
    if (!video) {
        res.status(404).json()
        return
    }

    const title: string = req.body.title //перед проверкой удаляем пробелы
    const author: string = req.body.author
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded
    const minAgeRestriction = req.body.minAgeRestriction
    const publicationDate = req.body.publicationDate

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


    //Если длина массива = true то вернем ошибку.
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
});

app.delete(SETTINGS.PATH.VIDEOS + "/:id", (req: Request, res: Response) => {
    let videoID: number = +req.params.id;
    let video = videos.find(v => v.id === videoID);
    if (!video) {
        res.status(404).json('Video not found')
        return
    }

    videos = videos.filter(v => v.id !== videoID)

    res.status(204).json("Video removed")
});


// app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter).PATH.VIDEOS, videosRouter)