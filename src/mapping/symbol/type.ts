export interface SymbolLevelData {
  /** symbol level */
  level: number;
  /** symbol current level need symbol to upgrade  */
  count: number;
  /** symbol current level need symbol from level 0 */
  stack: number;
}
