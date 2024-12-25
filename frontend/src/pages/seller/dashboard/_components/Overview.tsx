import { DollarSign, Users, ShoppingCart, Package } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// import {
//     ChartContainer,
//     ChartTooltip,
//     ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// const data = [
//     {
//         name: "Jan",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Feb",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Mar",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Apr",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "May",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jun",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jul",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Aug",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Sep",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Oct",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Nov",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Dec",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
// ];

export default function Overview() {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            New Customers
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Sales
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Now
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* <ChartContainer
                            config={{
                                total: {
                                    label: "Total",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="h-[350px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value: any) =>
                                            `$${value}`
                                        }
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="var(--color-total)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer> */}
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {/* Add recent sales items here */}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
