import { Room, SELECT_SEPARATOR } from "./room.ts";

export class RoomPair {
  constructor(readonly left: Room, readonly right: Room) {}

  get selections(): readonly string[] {
    return this.left.selections(this.right);
  }

  swap(selected: string): Self {
    const [leftName, rightName] = selected.split(SELECT_SEPARATOR);
    const left = this.left.find(leftName);
    const right = this.right.find(rightName);
    if (left === undefined || right === undefined) {
      throw new Error("選択されたメンバーが見つかりません");
    }
    return new RoomPair(
      this.left.replace(left, right),
      this.right.replace(right, left),
    );
  }

  get likeCount(): number {
    return this.left.likeCount + this.right.likeCount;
  }

  get dislikeCount(): number {
    return this.left.dislikeCount + this.right.dislikeCount;
  }

  toString(): string {
    return `${this.left.toString()} vs ${this.right.toString()}`;
  }
}
type Self = RoomPair;
