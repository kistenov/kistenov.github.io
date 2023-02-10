import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { EChartsOption } from "echarts";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements OnInit {
  public options!: EChartsOption;
  public updateOptions!: EChartsOption;

  private oneDay = 24 * 3600 * 1000;
  private now!: Date;
  private value!: number;
  private data!: unknown[];
  private timer!: number;

  public constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    // generate some random testing data:
    this.data = [];
    this.now = new Date(2022, 9, 3);
    this.value = Math.random() * 1000;

    for (let i = 0; i < 100; i = i + 1) {
      this.data.push(this.randomData());
    }

    // initialize chart options:
    this.options = {
      title: {
        text: "Your Balance",
      },
      tooltip: {
        trigger: "axis",
        // @ts-ignore
        formatter: (params: any) => {
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
          data: this.data,
        },
      ],
    } as EChartsOption;

    // Mock dynamic data:
    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

      // update series data:
      this.updateOptions = {
        series: [
          {
            data: this.data,
          },
        ],
      };

      this.changeDetectorRef.markForCheck();
    }, 10000);
  }

  public ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  public randomData(): { name: string; value: (string | number)[] } {
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.value =
      this.value +
      Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1);
    return {
      name: this.now.toString(),
      value: [
        [
          this.now.getFullYear(),
          this.now.getMonth() + 1,
          this.now.getDate(),
        ].join("/"),
        Math.round(this.value),
      ],
    };
  }
}
