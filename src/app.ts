import express from 'express'

export const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({hello: 'world'})
})
// app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)