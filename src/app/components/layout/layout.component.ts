import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PeriodicElement } from "@app/types";
import { faker } from "@faker-js/faker";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  public dataSource: PeriodicElement[] = [];
  public initBalance = faker.datatype.number({ min: 1500, max: 2000 });

  public constructor(public dialog: MatDialog) {}

  public ngOnInit(): void {
    Array.from({ length: 10 }).forEach(() => {
      this.dataSource.push(this.generateRow());
      this.sortData();
    });
  }

  public onItemCreated(data: PeriodicElement): void {
    this.dataSource = [
      ...this.dataSource,
      {
        ...data,
        id: faker.datatype.uuid(),
        profitLoss: this.calculateProfitLoss(data),
      },
    ];
    this.sortData();
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
    this.sortData();
  }

  public onItemDeleted(data: PeriodicElement): void {
    const filteredArray = this.dataSource.filter((item) => {
      return !(data.id === item.id);
    });
    this.dataSource = filteredArray;
    this.sortData();
  }

  private sortData(): void {
    const sortedData = [
      ...this.dataSource.sort((a, b) => {
        return b.exitDate.getTime() - a.exitDate.getTime();
      }),
    ].map((item, index) => {
      return {
        ...item,
        position: index + 1,
      };
    });
    this.dataSource = sortedData;
  }

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
    return (
      Math.round((trade.exitPrice - trade.entryPrice) * trade.amount * 100) /
      100
    );
  }
}
