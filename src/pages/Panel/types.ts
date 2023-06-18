export interface GameInfo {
  time: number;
  summary: {
    totalBet: number;
    players: string;
    totalProfit: number;
  };
  red: {
    profit: number;
  };
  green: {
    profit: number;
  };
}

export type MenuItemType = {
  title: string;
  tab: string;
  component: CallableFunction;
};
