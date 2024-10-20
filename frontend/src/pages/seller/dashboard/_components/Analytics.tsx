import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Sales Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                        <p className="text-muted-foreground">
                            Sales chart will be displayed here
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Analytics;
