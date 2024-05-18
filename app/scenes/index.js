import { Scenes } from "telegraf";

import { registration } from "./registration";

import { step_one } from "./stage_one";

export const stages = new Scenes.Stage([registration, step_one]);
