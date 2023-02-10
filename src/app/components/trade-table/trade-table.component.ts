import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { ConfirmDialogData, PeriodicElement } from "@app/types";
import { MatDialog } from "@angular/material/dialog";
import { TradeFormComponent } from "@app/components";
import { filter } from "rxjs";
import { ConfirmDialogsComponent } from "../confirm/confirm-dialogs.component";

@Component({
  selector: "app-trade-table",
  templateUrl: "./trade-table.component.html",
  styleUrls: ["./trade-table.component.scss"],
})
export class TradeTableComponent {
  @Input()
  public data: PeriodicElement[] = [];

  @Output()
  public itemCreated = new EventEmitter<PeriodicElement>();

  @Output()
  public itemChanged = new EventEmitter<PeriodicElement>();

  @Output()
  public itemDeleted = new EventEmitter<PeriodicElement>();

  public displayedColumns: string[] = [
    "position",
    "entryPrice",
    "amount",
    "entryDate",
    "exitPrice",
    "exitDate",
    "profitLoss",
    "actions",
  ];

  public constructor(
    public dialog: MatDialog,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

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
        this.itemCreated.emit(data);
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
        this.itemChanged.emit(data);
      });
  }

  public deleteRow(data: PeriodicElement): void {
    this.dialog
      .open<ConfirmDialogsComponent, ConfirmDialogData, boolean>(
        ConfirmDialogsComponent,
        {
          data: {
            title: "Delete trade",
            content: "Are you sure you want to delete this trade?",
            okText: "Delete",
          },
        }
      )
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.itemDeleted.emit(data);
      });
  }
}
