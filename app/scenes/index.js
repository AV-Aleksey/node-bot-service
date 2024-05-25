import { Scenes } from "telegraf";

import { registration } from "./registration";

import { verification } from "@app/scenes/verification";
import { ratingPoll } from "@app/scenes/RatingPoll";

// const scenes = [registration, verification];
export const scenes = [ratingPoll];

export const stages = new Scenes.Stage(scenes);
