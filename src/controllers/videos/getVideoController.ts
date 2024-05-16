import {Request, Response} from "express";
import {db} from "../../db/db";
import {VideosDBType} from "../../types/videoDB-type";

export const getVideoController = (
    req: Request,
    res: Response<VideosDBType[]>) => {

    res.status(200).json(db.videos)
}