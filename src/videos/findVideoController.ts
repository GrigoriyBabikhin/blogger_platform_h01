import {Request, Response} from "express";
import {db} from "../db/db";

export const findVideoController = (req: Request, res: Response) => {
    let videoID: number = +req.params.id;
    let video = db.videos.find(v => v.id === videoID);
    if (!video) {
        res.status(404).json('Video not found')
    }
    res.status(200).json(video)
}