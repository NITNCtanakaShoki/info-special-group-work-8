import { Member } from "../core/room/member.ts";
import { Room } from "../core/room/room.ts";
import { Rooms } from "../core/room/rooms.ts";

export class Members {
  #v: readonly Member[];
  constructor(v: readonly Member[] = []) {
    this.#v = v;
  }

  register(...members: readonly Member[]) {
    this.#v = this.#v.concat(members);
  }

  get list(): readonly Member[] {
    return this.#v.slice();
  }

  divideRooms(count: number): Rooms {
    const members = this.#v.slice()
      .map(() => ({ i: Math.floor(Math.random() * count), members: this.#v }))
      .reduce<Map<number, Members>>((rooms, { i, members }) => {
        const room = rooms.get(i) ?? new Members();
        room.register(...members);
        rooms.set(i, room);
        return rooms;
      }, new Map()).values();
    return new Rooms(
      Array.from(members).map((members) => new Room(members.list)),
    );
  }

  equals(compared: Members): boolean {
    return this.#v.length === compared.#v.length &&
      this.#v.every((member, index) => member.equals(compared.#v[index]));
  }
}
type Self = Members;
