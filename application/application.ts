import { Members } from "./members.ts";
import { State } from "../core/state.ts";
import { createRewardHandler } from "../core/reward.ts";
import { DEFAULT_ENVIRONMENT, Environment } from "./environment.ts";
import { AgentHandler } from "../core/agent.ts";
import {Member} from "../core/room/member.ts";

export class Application {
  constructor(
    public agent?: AgentHandler,
    public members: Members = new Members(),
    public readonly env: Environment = DEFAULT_ENVIRONMENT,
  ) {}

  register(handler: AgentHandler): void {
    this.agent = handler;
  }

  run(): void {
    const agent = this.#requireAgent();
    let rooms = this.members.divideRooms(this.env.countPerRoom);

    process_loop: while (true) {
      let pair = rooms.randomPair();
      while (true) {
        const state = new State(
          pair.selections,
          pair.likeCount,
          pair.dislikeCount,
        );
        const action = agent(state, createRewardHandler(rooms, pair), this);
        if (action.exit) break process_loop;
        if (action.next) continue;
        const selection = action.select;
        if (selection === undefined) throw new Error("選択が行われていません");
        pair = pair.swap(selection);
        rooms = rooms.replacePair(pair);
      }
    }
    console.log(rooms.toString());
  }

  /** エージェントが登録されていない場合はエラーを出力して終了する */
  #requireAgent(): AgentHandler {
    if (!this.agent) {
      console.error("エージェントが登録されていません");
      throw new Error("エージェントが登録されていません");
    }
    return this.agent;
  }
}
