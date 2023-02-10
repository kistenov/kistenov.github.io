import { DatePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { ChartAccumulator, chartData, PeriodicElement } from "@app/types";
import { EChartsOption } from "echarts";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class LineChartComponent implements OnChanges {
  @Input()
  public dataSource!: PeriodicElement[];

  @Input()
  public initBalance: number = 0;

  public options!: EChartsOption;
  private chartData!: chartData[];

  public constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["dataSource"]) {
      this.chartData = [
        ...(changes["dataSource"].currentValue as PeriodicElement[]),
      ]
        .sort((a, b) => {
          return a.exitDate.getTime() - b.exitDate.getTime();
        })
        .reduce(
          (acc: ChartAccumulator, item: PeriodicElement) => {
            const profitLoss = item.profitLoss ?? 0;
            const balance = acc.balance + profitLoss;
            return {
              data: [
                ...acc.data,
                {
                  name: item.exitDate.toString(),
                  value: [
                    this.datePipe.transform(
                      item.exitDate,
                      "yyyy/M/d"
                    ) as string,
                    balance,
                  ],
                },
              ],
              balance: balance,
            } as ChartAccumulator;
          },
          { balance: this.initBalance, data: [] }
        ).data;
    }

    this.updateChartOption();
    this.changeDetectorRef.detectChanges();
  }

  private updateChartOption(): void {
    this.options = {
      title: {
        text: "Your Balance",
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          console.log(params);

          params = params[0];
          const date = new Date(params.name);
          return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            " : " +
            params.value[1]
          );
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: "time",
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        axisLabel: {
          formatter: "{value} $",
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: "Mocking Data",
          type: "line",
          showSymbol: false,
          emphasis: {
            line: false,
          },
          data: this.chartData,
        },
      ],
    } as EChartsOption;
  }
}
