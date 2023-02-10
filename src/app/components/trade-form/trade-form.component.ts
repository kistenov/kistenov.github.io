import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PeriodicElement } from "@app/types";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { dateRangeValidator } from "@app/validators";

@Component({
  selector: "app-trade-form",
  templateUrl: "./trade-form.component.html",
  styleUrls: ["./trade-form.component.scss"],
})
export class TradeFormComponent implements OnInit {
  public form: FormGroup = this.formBuilder.group({
    entryPrice: ["", [Validators.required, Validators.min(1)]],
    entryDate: ["", Validators.required],
    amount: ["", [Validators.required, Validators.min(1)]],
    exitPrice: ["", [Validators.required, Validators.min(1)]],
    exitDate: ["", [Validators.required, dateRangeValidator("entryDate")]],
  });

  public get value(): Partial<PeriodicElement> {
    return { ...(this.data ?? {}), ...this.form.value };
  }

  public constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: Partial<PeriodicElement>,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    if (!this.data) {
      return;
    }

    this.form.patchValue(this.data);
  }

  public updateValueAndValidity(): void {
    Object.entries(this.form.controls ?? {}).forEach(([key, control]) => {
      control.updateValueAndValidity();
    });
  }
}
