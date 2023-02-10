export interface PeriodicElement {
  position: number;
  entryPrice: number;
  amount: number;
  entryDate: Date;
  exitPrice: number;
  exitDate: Date;
  id: string;
  profitLoss?: number;
}

export interface ConfirmDialogData {
  title: string;
  content: string;
  okText?: string;
}
