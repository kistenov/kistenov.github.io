export interface ChartItem {
  name: string;
  value: [string, number];
}

export interface ChartAccumulator {
  balance: number;
  data: ChartItem[];
}
