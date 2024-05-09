import express from 'express'
import {videosRouter} from "./routers/videos/videos-router";
import {SETTINGS} from "./settings";
import {testingRouter} from "./routers/testings/testing-router";
import {db} from "./db/db";

export const app = express()
app.use(express.json()) // добавление ко всем реквестам body и query

app.use(SETTINGS.PATH.TESTING, testingRouter)
app.use(SETTINGS.PATH.VIDEOS, videosRouter)

app.delete('/__test__/videos', (req, res) => {
    db.videos = [];
    res.status(204).json()
})





