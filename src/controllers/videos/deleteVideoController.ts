import {Request, Response} from "express";
import {db} from "../../db/db";

export const deleteVideoController = (req: Request, res: Response) => {
    let videoID: number = +req.params.id;
    let video = db.videos.find(v => v.id === videoID);
    if (!video) {
        res.status(404).json('Video not found')
        return
    }

    db.videos = db.videos.filter(v => v.id !== videoID)

    res.status(204).json("Video removed")
}