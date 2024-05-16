import {Resolutions} from "../db/db";

export type BodyType = {
    title: string;
    author: string;
    availableResolutions: Resolutions[];
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
}

export type ParamType = {
    id: string
}