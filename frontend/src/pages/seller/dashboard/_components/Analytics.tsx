import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
    { name: "Jan", sales: 4000, revenue: 2400, visitors: 2400 },
    { name: "Feb", sales: 3000, revenue: 1398, visitors: 2210 },
    { name: "Mar", sales: 2000, revenue: 9800, visitors: 2290 },
    { name: "Apr", sales: 2780, revenue: 3908, visitors: 2000 },
    { name: "May", sales: 1890, revenue: 4800, visitors: 2181 },
    { name: "Jun", sales: 2390, revenue: 3800, visitors: 2500 },
    { name: "Jul", sales: 3490, revenue: 4300, visitors: 2100 },
];

export default function Analytics() {
    return (
        <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="visitors">Visitors</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Sales
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">18,549</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$27,404</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Visitors
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">15,681</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Conversion Rate
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3.2%</div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Analytics Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartContainer
                            config={{
                                sales: {
                                    label: "Sales",
                                    color: "hsl(var(--chart-1))",
                                },
                                revenue: {
                                    label: "Revenue",
                                    color: "hsl(var(--chart-2))",
                                },
                                visitors: {
                                    label: "Visitors",
                                    color: "hsl(var(--chart-3))",
                                },
                            }}
                            className="h-[350px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value: any) =>
                                            `${value}`
                                        }
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value: any) =>
                                            `${value}`
                                        }
                                    />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="sales"
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="revenue"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="visitors"
                                        strokeWidth={2}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="sales" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Sales Analytics</CardTitle>
                        <CardDescription>
                            Detailed sales data and trends
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Add sales-specific analytics content here */}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="revenue" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Analytics</CardTitle>
                        <CardDescription>
                            Detailed revenue data and trends
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Add revenue-specific analytics content here */}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="visitors" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Visitor Analytics</CardTitle>
                        <CardDescription>
                            Detailed visitor data and trends
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Add visitor-specific analytics content here */}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
