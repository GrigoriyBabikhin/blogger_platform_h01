import {Request, Response} from "express";
import {db} from "../../db/db";

export const deleteVideoController = (req: Request<{id: string}>, res: Response) => {
    let videoID: number = +req.params.id;
    let video = db.videos.find(v => v.id === videoID);
    if (!video) {
        res.status(404).json()
        return
    }

    db.videos = db.videos.filter(v => v.id !== videoID)
    res.status(204).json()
}