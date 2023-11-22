import { State } from "./state.ts";
import { Action } from "./action.ts";
import { Application } from "../application/application.ts";
import { RewardHandler } from "./reward.ts";

export type AgentHandler = (
  state: State,
  reward: RewardHandler,
  app: Application,
) => Action;
