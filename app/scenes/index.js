import { Scenes } from "telegraf";

import { registration } from "./registration";

import { verification } from "@app/scenes/verification";
import { ratingPoll } from "@app/scenes/RatingPoll";
import { step_one } from "@app/scenes/stage_one";

// const scenes = [registration, verification];
export const scenes = [step_one];

export const stages = new Scenes.Stage(scenes);
