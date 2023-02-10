import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { PeriodicElement } from "@app/types";
import { MatDialog } from "@angular/material/dialog";
import { TradeFormComponent } from "@app/components";
import { faker } from "@faker-js/faker";
import { filter } from "rxjs";

@Component({
  selector: "app-trade-table",
  templateUrl: "./trade-table.component.html",
  styleUrls: ["./trade-table.component.scss"],
})
export class TradeTableComponent implements OnInit {
  public displayedColumns: string[] = [
    "position",
    "entryPrice",
    "amount",
    "entryDate",
    "exitPrice",
    "exitDate",
    "edit",
  ];
  public dataSource: PeriodicElement[] = [];

  public constructor(
    public dialog: MatDialog,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    Array.from({ length: 10 }).forEach(() => {
      this.dataSource.push(this.generateRow());
    });

    this.changeDetectorRef.markForCheck();
  }

  public openDialog(): void {
    this.dialog
      .open(TradeFormComponent, {
        data: {
          animal: "panda",
        },
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((data) => {
        this.dataSource = [
          ...this.dataSource,
          {
            ...this.generateRow(),
            ...data,
          },
        ];
        this.changeDetectorRef.detectChanges();
      });
  }

  public openEditDialog(data: PeriodicElement): void {
    this.dialog
      .open(TradeFormComponent, {
        data,
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((data) => {
        this.dataSource = [
          ...this.dataSource.map((item) => {
            return item.id === data.id ? data : item;
          }),
        ];
        this.changeDetectorRef.detectChanges();
      });
  }

  protected generateRow(): PeriodicElement {
    return {
      position: this.dataSource.length + 1,
      entryPrice: faker.datatype.number(),
      amount: faker.datatype.number(),
      entryDate: faker.date.past(),
      exitPrice: faker.datatype.number(),
      exitDate: faker.date.past(),
      id: faker.datatype.uuid(),
    };
  }
}
