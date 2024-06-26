import {config} from 'dotenv'

config()

export const SETTINGS = {
    PORT: process.env.PORT || 3004,
    PATH: {
        VIDEOS: '/videos/',
        TESTING: "/testing/all-data" ///testing/all-data
    },
}