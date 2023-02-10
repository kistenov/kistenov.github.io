import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PeriodicElement } from "@app/types";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-trade-form",
  templateUrl: "./trade-form.component.html",
  styleUrls: ["./trade-form.component.scss"],
})
export class TradeFormComponent implements OnInit {
  public form: FormGroup = this.formBuilder.group({
    entryPrice: ["", [Validators.required, Validators.min(0)]],
    entryDate: ["", Validators.required],
    amount: ["", [Validators.required, Validators.min(0)]],
    exitPrice: ["", [Validators.required, Validators.min(0)]],
    exitDate: ["", Validators.required],
  });

  public get value(): Partial<PeriodicElement> {
    return { ...(this.data ?? {}), ...this.form.value };
  }

  public get dateRangeValidator(): boolean {
    let invalid = false;
    const from = this.form && this.form.get("entryDate")?.value;
    const to = this.form && this.form.get("exitDate")?.value;

    if (from && to) {
      invalid = new Date(from).valueOf() > new Date(to).valueOf();
    }

    return !invalid;
  }

  public constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: Partial<PeriodicElement>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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
