import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfirmDialogData } from "@app/types";

@Component({
  // eslint-disable-next-line
  selector: "confirm-dialog",
  templateUrl: "./confirm-dialogs.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogsComponent {
  public constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}
}
