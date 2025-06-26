"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

interface SalesData {
  date: string;
  sales: number;
  totalItems: number;
}

// Sample daily sales data for demonstration
const chartData: SalesData[] = [
  { date: "2024-04-01", sales: 1200, totalItems: 32 },
  { date: "2024-04-02", sales: 980, totalItems: 28 },
  { date: "2024-04-03", sales: 1670, totalItems: 45 },
  { date: "2024-04-04", sales: 2420, totalItems: 62 },
  { date: "2024-04-05", sales: 3730, totalItems: 84 },
  { date: "2024-04-06", sales: 3010, totalItems: 76 },
  { date: "2024-04-07", sales: 2450, totalItems: 58 },
  { date: "2024-04-08", sales: 4090, totalItems: 92 },
  { date: "2024-04-09", sales: 590, totalItems: 15 },
  { date: "2024-04-10", sales: 2610, totalItems: 58 },
  { date: "2024-04-11", sales: 3270, totalItems: 74 },
  { date: "2024-04-12", sales: 2920, totalItems: 65 },
  { date: "2024-04-13", sales: 3420, totalItems: 78 },
  { date: "2024-04-14", sales: 1370, totalItems: 32 },
  { date: "2024-04-15", sales: 1200, totalItems: 28 },
  { date: "2024-04-16", sales: 1380, totalItems: 34 },
  { date: "2024-04-17", sales: 4460, totalItems: 96 },
  { date: "2024-04-18", sales: 3640, totalItems: 82 },
  { date: "2024-04-19", sales: 2430, totalItems: 54 },
  { date: "2024-04-20", sales: 890, totalItems: 22 },
  { date: "2024-04-21", sales: 1370, totalItems: 36 },
  { date: "2024-04-22", sales: 2240, totalItems: 52 },
  { date: "2024-04-23", sales: 1380, totalItems: 38 },
  { date: "2024-04-24", sales: 3870, totalItems: 85 },
  { date: "2024-04-25", sales: 2150, totalItems: 48 },
  { date: "2024-04-26", sales: 750, totalItems: 18 },
  { date: "2024-04-27", sales: 3830, totalItems: 86 },
  { date: "2024-04-28", sales: 1220, totalItems: 32 },
  { date: "2024-04-29", sales: 3150, totalItems: 72 },
  { date: "2024-04-30", sales: 4540, totalItems: 98 },
  { date: "2024-05-01", sales: 1650, totalItems: 42 },
  { date: "2024-05-02", sales: 2930, totalItems: 68 },
  { date: "2024-05-03", sales: 2470, totalItems: 56 },
  { date: "2024-05-04", sales: 3850, totalItems: 88 },
  { date: "2024-05-05", sales: 4810, totalItems: 104 },
  { date: "2024-05-06", sales: 4980, totalItems: 112 },
  { date: "2024-05-07", sales: 3880, totalItems: 82 },
  { date: "2024-05-08", sales: 1490, totalItems: 36 },
  { date: "2024-05-09", sales: 2270, totalItems: 54 },
  { date: "2024-05-10", sales: 2930, totalItems: 68 },
  { date: "2024-05-11", sales: 3350, totalItems: 76 },
  { date: "2024-05-12", sales: 1970, totalItems: 48 },
  { date: "2024-05-13", sales: 1970, totalItems: 46 },
  { date: "2024-05-14", sales: 4480, totalItems: 102 },
  { date: "2024-05-15", sales: 4730, totalItems: 110 },
  { date: "2024-05-16", sales: 3380, totalItems: 78 },
  { date: "2024-05-17", sales: 4990, totalItems: 114 },
  { date: "2024-05-18", sales: 3150, totalItems: 74 },
  { date: "2024-05-19", sales: 2350, totalItems: 58 },
  { date: "2024-05-20", sales: 1770, totalItems: 42 },
  { date: "2024-05-21", sales: 820, totalItems: 22 },
  { date: "2024-05-22", sales: 810, totalItems: 24 },
  { date: "2024-05-23", sales: 2520, totalItems: 62 },
  { date: "2024-05-24", sales: 2940, totalItems: 68 },
  { date: "2024-05-25", sales: 2010, totalItems: 48 },
  { date: "2024-05-26", sales: 2130, totalItems: 52 },
  { date: "2024-05-27", sales: 4200, totalItems: 96 },
  { date: "2024-05-28", sales: 2330, totalItems: 56 },
  { date: "2024-05-29", sales: 780, totalItems: 18 },
  { date: "2024-05-30", sales: 3400, totalItems: 76 },
  { date: "2024-05-31", sales: 1780, totalItems: 42 },
  { date: "2024-06-01", sales: 1780, totalItems: 44 },
  { date: "2024-06-02", sales: 4700, totalItems: 106 },
  { date: "2024-06-03", sales: 1030, totalItems: 28 },
  { date: "2024-06-04", sales: 4390, totalItems: 98 },
  { date: "2024-06-05", sales: 880, totalItems: 24 },
  { date: "2024-06-06", sales: 2940, totalItems: 68 },
  { date: "2024-06-07", sales: 3230, totalItems: 76 },
  { date: "2024-06-08", sales: 3850, totalItems: 86 },
  { date: "2024-06-09", sales: 4380, totalItems: 102 },
  { date: "2024-06-10", sales: 1550, totalItems: 38 },
  { date: "2024-06-11", sales: 920, totalItems: 24 },
  { date: "2024-06-12", sales: 4920, totalItems: 112 },
  { date: "2024-06-13", sales: 810, totalItems: 22 },
  { date: "2024-06-14", sales: 4260, totalItems: 96 },
  { date: "2024-06-15", sales: 3070, totalItems: 72 },
  { date: "2024-06-16", sales: 3710, totalItems: 84 },
  { date: "2024-06-17", sales: 4750, totalItems: 108 },
  { date: "2024-06-18", sales: 1070, totalItems: 28 },
  { date: "2024-06-19", sales: 3410, totalItems: 76 },
  { date: "2024-06-20", sales: 4080, totalItems: 92 },
  { date: "2024-06-21", sales: 1690, totalItems: 42 },
  { date: "2024-06-22", sales: 3170, totalItems: 76 },
  { date: "2024-06-23", sales: 4800, totalItems: 106 },
  { date: "2024-06-24", sales: 1320, totalItems: 34 },
  { date: "2024-06-25", sales: 1410, totalItems: 36 },
  { date: "2024-06-26", sales: 4340, totalItems: 98 },
  { date: "2024-06-27", sales: 4480, totalItems: 102 },
  { date: "2024-06-28", sales: 1490, totalItems: 38 },
  { date: "2024-06-29", sales: 1030, totalItems: 28 },
  { date: "2024-06-30", sales: 4460, totalItems: 98 },
]

const chartConfig = {
  sales: {
    label: "Total Sales",
    color: "var(--primary)",
  },
  totalItems: {
    label: "Items Sold",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  // Format dollar amount with commas
  const formatDollar = (amount: number): string => {
    return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  // Calculate total sales for selected period
  const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);
  const totalItemsSold = filteredData.reduce((sum, item) => sum + item.totalItems, 0);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Daily Sales</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {formatDollar(totalSales)} from {totalItemsSold} items sold
          </span>
          <span className="@[540px]/card:hidden">
            {formatDollar(totalSales)}
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a time range"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <Area
              dataKey="sales"
              dot={false}
              activeDot={{
                r: 4,
                style: { fill: "var(--color-sales)" },
              }}
              type="monotone"
              stroke="var(--color-sales)"
              strokeWidth={2}
              fill="url(#fillSales)"
            />
            <ChartTooltip
              content={(props) => {
                const { active, payload } = props;
                if (!active || !payload || !payload.length) return null;
                
                const data = payload[0].payload as SalesData;
                return (
                  <ChartTooltipContent className="p-0">
                    <div className="flex flex-col gap-1 p-3">
                      <div className="text-xs text-muted-foreground">
                        {new Date(data.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[var(--color-sales)]" />
                        <div className="font-medium">
                          {formatDollar(data.sales)}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {data.totalItems} items sold
                      </div>
                    </div>
                  </ChartTooltipContent>
                );
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
