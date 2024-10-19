import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Orders = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[1, 2, 3].map((order) => (
                        <div
                            key={order}
                            className="flex items-center justify-between border-b pb-2"
                        >
                            <div>
                                <p className="font-medium">
                                    Order #{order}00{order}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    2 items - $99.00
                                </p>
                            </div>
                            <Button variant="outline" size="sm">
                                View Details
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Orders;
