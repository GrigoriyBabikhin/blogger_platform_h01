import {Router} from "express";
import {SETTINGS} from "../../settings";
import {clearDBController} from "../../controllers/testing/clearDBController";


export const testingRouter = Router()

testingRouter.delete(SETTINGS.PATH.TESTING, clearDBController);
