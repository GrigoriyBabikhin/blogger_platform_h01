import express from 'express'
import {SETTINGS} from "./settings";
import {clearDBController} from "./db/clearDBController";
import {videosRouter} from "./videos/videos-router";

export const app = express()
app.use(express.json()) // добавление ко всем реквестам body и query

app.use(SETTINGS.PATH.VIDEOS, videosRouter)

app.delete(SETTINGS.PATH.TESTING, clearDBController);



