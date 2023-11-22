import { Member } from "./member.ts";

export const SELECT_SEPARATOR = " - ";

export class Room {
  readonly id: string = crypto.randomUUID();
  readonly #v: readonly Member[];
  constructor(members: readonly Member[]) {
    this.#v = members;
  }

  selections(compared: Room): readonly string[] {
    return this.#v.flatMap((member) =>
      compared.#v.map((comparedMember) => [member, comparedMember])
    ).sort(([l1, r1], [l2, r2]) => l1.diffPoint(r1) - l2.diffPoint(r2))
      .map(([l, r]) => `${l.name}${SELECT_SEPARATOR}${r.name}`);
  }

  find(name: string): Member | undefined {
    return this.#v.find((member) => member.name === name);
  }

  replace(old: Member, next: Member): Self {
    return new Room(
      this.#v.map((member) => member.equals(old) ? next : member),
    );
  }

  get likeCount(): number {
    return this.#v.reduce<number>((count, member, _, members) => {
      return count +
        members.filter((m) => member !== m).reduce(
          (count, other) => member.isLike(other) ? count + 1 : count,
          count,
        );
    }, 0);
  }

  get dislikeCount(): number {
    return this.#v.reduce<number>((count, member, _, members) => {
      return count +
        members.filter((m) => member !== m).reduce(
          (count, other) => member.isDislike(other) ? count + 1 : count,
          count,
        );
    }, 0);
  }

  get reward(): number {
    return this.likeCount - this.dislikeCount;
  }

  toString(): string {
    return this.#v.map((member) => member.toString()).join(", ");
  }
}
type Self = Room;
