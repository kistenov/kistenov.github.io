import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
  LayoutComponent,
  LineChartComponent,
  TradeFormComponent,
  TradeTableComponent,
} from "@app/components";
import { MaterialModule } from "@app/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxEchartsModule } from "ngx-echarts";
import { ConfirmDialogsComponent } from "./components/confirm/confirm-dialogs.component";

@NgModule({
  declarations: [
    LayoutComponent,
    TradeTableComponent,
    TradeFormComponent,
    LineChartComponent,
    ConfirmDialogsComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
  ],
  providers: [],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
