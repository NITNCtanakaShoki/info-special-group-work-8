export class State {
  /**
   * @param selections 選択肢一覧
   * @param likeCount 好きな人と一緒になっている人数
   * @param dislikeCount 嫌いな人と一緒になっている人数
   */
  constructor(
    readonly selections: readonly string[],
    readonly likeCount: number,
    readonly dislikeCount: number,
  ) {
  }
}
