import {Request, Response} from "express";
import {db} from "../../db/db";
import {VideosDBType} from "../../types/videoDB-type";
import {ParamType} from "../../types/request-response-types";

export const findVideoController = (
    req: Request<ParamType>,
    res: Response<VideosDBType>) => {

    let videoID: number = +req.params.id;
    let video: VideosDBType | undefined = db.videos.find(v => v.id === videoID);
    if (!video) {
        res.status(404).json()
    }
    res.status(200).json(video)
}