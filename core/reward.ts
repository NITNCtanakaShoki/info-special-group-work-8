import { Action } from "./action.ts";
import { Rooms } from "./room/rooms.ts";
import { RoomPair } from "./room/roomPair.ts";

export type RewardHandler = (action: Action) => Reward;
export type Reward = number;

export function createRewardHandler(
  rooms: Rooms,
  pair: RoomPair,
): RewardHandler {
  return (action: Action): Reward => {
    if (action.exit) return rooms.reward;
    if (action.next) return rooms.reward;
    if (action.select === undefined) throw new Error("選択が行われていません");
    return rooms.replacePair(pair.swap(action.select)).reward;
  };
}
