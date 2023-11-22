export class Action {
  private constructor(
    readonly select?: string,
    readonly next: boolean = false,
    readonly exit = false,
  ) {}

  static select(select: string): Action {
    return new Action(select);
  }

  static readonly next = new Action(undefined, true);
  static readonly exit = new Action(undefined, false, true);
}
