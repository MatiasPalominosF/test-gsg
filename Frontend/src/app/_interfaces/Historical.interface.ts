export interface IHistoricalData {
  date: string;
  close: number;
}

export interface IStockData {
  symbol: string;
  historical: IHistoricalData[];
}
