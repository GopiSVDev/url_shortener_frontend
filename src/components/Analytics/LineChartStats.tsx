import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useTheme } from "next-themes";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChartStats = ({
  clicksByDate,
}: {
  clicksByDate: { date: string; clicks: number }[];
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clicks Over Time</CardTitle>
        <CardDescription>Track clicks for last days</CardDescription>
      </CardHeader>
      <CardContent style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={clicksByDate}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff", // dark:bg-gray-800, light:bg-white
                borderColor: isDark ? "#374151" : "#e5e7eb", // dark:border-gray-700
                color: isDark ? "#f9fafb" : "#111827", // dark:text-gray-50
              }}
              labelStyle={{ color: isDark ? "#d1d5db" : "#374151" }}
              itemStyle={{ color: isDark ? "#f9fafb" : "#111827" }}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="var(--chart-1)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartStats;
