import {Resolutions} from "../db/db";

export type VideosDBType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: Date
    publicationDate: Date
    availableResolutions: Resolutions[]
}

export type DBType = {
    videos: VideosDBType[]
}