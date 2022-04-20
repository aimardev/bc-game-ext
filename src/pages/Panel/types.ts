export interface ScanInfo {
  name: string;
  hash: string;
  created: Date;
  result: string;
  status: string;
}

export type MenuItemType = {
  title: string;
  tab: string;
  component: CallableFunction;
}
