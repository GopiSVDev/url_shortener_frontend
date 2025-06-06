import * as React from "react";
import { Label, Legend, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const transformDeviceData = (data: Record<string, number>) => {
  let mobileClicks = 0;
  let desktopClicks = 0;
  let othersClicks = 0;

  for (const [device, clicks] of Object.entries(data)) {
    const key = device.toLowerCase();
    if (key === "mobile") {
      mobileClicks += clicks;
    } else if (key === "desktop") {
      desktopClicks += clicks;
    } else {
      othersClicks += clicks;
    }
  }

  const result = [
    {
      device: chartConfig.mobile.label,
      clicks: mobileClicks,
      fill: chartConfig.mobile.color,
    },
    {
      device: chartConfig.desktop.label,
      clicks: desktopClicks,
      fill: chartConfig.desktop.color,
    },
  ];

  if (othersClicks > 0) {
    result.push({
      device: chartConfig.other.label,
      clicks: othersClicks,
      fill: chartConfig.other.color,
    });
  }

  return result;
};

const DeviceStats = ({
  clicksByDeviceType,
}: {
  clicksByDeviceType: { device: string; clicks: number }[];
}) => {
  const deviceClicksMap =
    clicksByDeviceType &&
    clicksByDeviceType.reduce((acc, curr) => {
      acc[curr.device.toLowerCase()] = curr.clicks;
      return acc;
    }, {} as Record<string, number>);

  const chartData = transformDeviceData(deviceClicksMap);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.clicks, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Devices</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="clicks"
              nameKey="device"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DeviceStats;
