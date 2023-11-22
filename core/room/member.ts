export class Member {
  constructor(
    readonly name: string,
    readonly likes: readonly string[] = [],
    readonly dislikes: readonly string[] = [],
  ) {}

  equals(compared: Member): boolean {
    return this.name === compared.name;
  }

  isLike(other: Self): boolean {
    return this.likes.includes(other.name);
  }

  isDislike(other: Self): boolean {
    return this.dislikes.includes(other.name);
  }

  diffPoint(member: Member): number {
    const isLike = this.likes.includes(member.name);
    const isDislike = this.dislikes.includes(member.name);
    return 0 + (isLike ? 1 : 0) - (isDislike ? 1 : 0);
  }

  toString(): string {
    return this.name;
  }
}
type Self = Member;
