import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { chartData, PeriodicElement } from "@app/types";
import { faker } from "@faker-js/faker";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  providers: [DatePipe],
})
export class LayoutComponent implements OnInit {
  public dataSource: PeriodicElement[] = [];
  public initBalance = faker.datatype.number({ min: 1500, max: 2000 });
  public constructor(public dialog: MatDialog, private datePipe: DatePipe) {}

  public ngOnInit(): void {
    Array.from({ length: 10 }).forEach(() => {
      this.dataSource.push(this.generateRow());
    });
  }

  public onItemCreated(data: PeriodicElement): void {
    this.dataSource = [
      ...this.dataSource,
      {
        ...data,
        position: this.dataSource.length + 1,
        profitLoss: this.calculateProfitLoss(data),
      },
    ];
  }

  public onItemChanged(data: PeriodicElement): void {
    this.dataSource = [
      ...this.dataSource.map((item) => {
        if (item.id === data.id) {
          const trade = {
            ...item,
            ...data,
          };
          return {
            ...trade,
            profitLoss: this.calculateProfitLoss(trade),
          };
        }

        return item;
      }),
    ];
  }
  public onItemDeleted(data: PeriodicElement) {
    const filteredArray = this.dataSource
      .filter((item) => {
        return !(data.id === item.id);
      })
      .map((item, index) => {
        return {
          ...item,
          position: index + 1,
        };
      });
    this.dataSource = filteredArray;
  }

  public onDataUpdate(data: PeriodicElement) {}

  protected generateRow(): PeriodicElement {
    const entryDate = faker.date.past();
    const trade = {
      position: this.dataSource.length + 1,
      entryPrice: faker.datatype.number({ min: 1500, max: 2000 }),
      amount: faker.datatype.number({ min: 1, max: 5 }),
      entryDate: entryDate,
      exitPrice: faker.datatype.number({ min: 1500, max: 2000 }),
      exitDate: new Date(entryDate.valueOf() + 864e5 * 1),
      id: faker.datatype.uuid(),
    };
    return {
      ...trade,
      profitLoss: this.calculateProfitLoss(trade),
    };
  }

  private calculateProfitLoss(trade: PeriodicElement): number {
    return (trade.exitPrice - trade.entryPrice) * trade.amount;
  }
}
