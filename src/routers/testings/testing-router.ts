import {Router} from "express";
import {clearDBController} from "../../controllers/testing/clearDBController";


export const testingRouter = Router()

testingRouter.delete('/', clearDBController);
