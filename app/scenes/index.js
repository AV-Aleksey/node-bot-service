import { Scenes } from "telegraf";

import { registration } from "./registration";

import { verification } from "@app/scenes/verification";

const scenes = [registration, verification];

export const stages = new Scenes.Stage(scenes);
