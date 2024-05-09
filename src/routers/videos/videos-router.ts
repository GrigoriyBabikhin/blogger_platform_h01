import {Router} from "express";
import {getVideoController} from "../../controllers/videos/getVideoController";
import {createVideosController} from "../../controllers/videos/createVideosController";
import {findVideoController} from "../../controllers/videos/findVideoController";
import {updateVideoController} from "../../controllers/videos/updateVideoController";
import {deleteVideoController} from "../../controllers/videos/deleteVideoController";

export const videosRouter = Router({})

videosRouter.get('/', getVideoController);

videosRouter.post('/', createVideosController);

videosRouter.get('/:id', findVideoController);

videosRouter.put('/:id', updateVideoController);

videosRouter.delete('/:id', deleteVideoController);