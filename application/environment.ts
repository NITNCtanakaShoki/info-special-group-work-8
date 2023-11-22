export interface Environment {
  /** 部屋ごとの人数 */
  countPerRoom: number;
}
export const DEFAULT_ENVIRONMENT: Environment = {
  countPerRoom: 3,
} as const;
