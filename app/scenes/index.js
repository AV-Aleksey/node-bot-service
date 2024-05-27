import { Scenes } from "telegraf";

import { registration } from "./registration";
import { verification } from "@app/scenes/verification";
import { ratingPoll } from "@app/scenes/ratingPoll";
import { stage } from "@app/scenes/stage";

// const scenes = [registration, verification];
export const scenes = [registration];

export const stages = new Scenes.Stage(registration);
