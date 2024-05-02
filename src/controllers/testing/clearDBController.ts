import {Request, Response} from "express";
import {db} from "../../db/db";

export const clearDBController = (req: Request, res: Response) => {
    db.videos.length = 0
    res.status(204).json()
}