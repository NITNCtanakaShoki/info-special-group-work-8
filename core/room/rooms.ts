import { Room } from "./room.ts";
import { RoomPair } from "./roomPair.ts";

export class Rooms {
  readonly #v: readonly Room[];
  constructor(rooms: readonly Room[]) {
    if (rooms.length < 2) {
      throw new Error("2部屋以上必要です");
    }
    this.#v = rooms;
  }

  randomPair(): RoomPair {
    const leftIndex = Math.floor(Math.random() * this.#v.length);
    let rightIndex = Math.floor(Math.random() * this.#v.length);
    while (leftIndex === rightIndex) {
      rightIndex = Math.floor(Math.random() * this.#v.length);
    }
    return new RoomPair(this.#v[leftIndex], this.#v[rightIndex]);
  }

  replacePair(pair: RoomPair): Self {
    return new Rooms(this.#v.map((room) => {
      if (room.id === pair.left.id) return pair.left;
      if (room.id === pair.right.id) return pair.right;
      return room;
    }));
  }

  get reward(): number {
    return this.#v.reduce((sum, room) => sum + room.reward, 0);
  }

  toString(): string {
    return this.#v.map((room) => room.toString()).join("\n");
  }
}
type Self = Rooms;
