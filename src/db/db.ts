import {VideosDBType} from "../types/videos-db-tupe";

export enum AvailableResolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160",
}

export type DBType = {
    videos: VideosDBType[]
}

export const db: DBType = {
    videos: [
        {
            "id": 0,
            "title": "string",
            "author": "string",
            "canBeDownloaded": false,
            "minAgeRestriction": null,
            "createdAt": "2024-04-07T10:35:45.728Z",
            "publicationDate": "2024-04-07T10:35:45.728Z",
            "availableResolutions": [AvailableResolutions.P144]
        }
    ]
}
