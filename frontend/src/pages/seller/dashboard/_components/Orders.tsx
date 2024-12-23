import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getSellerOrders } from "@/services/useSellerServices";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
    const { data } = useQuery({
        queryKey: ["sellerOrders"],
        queryFn: getSellerOrders,
    });
    const orders = data?.data?.orders;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {orders?.length > 0 &&
                        orders.map((order: any, index: any) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border-b pb-2"
                            >
                                <div>
                                    <span className="font-medium">
                                        Order {order.productId}
                                    </span>
                                    <div className="text-sm text-muted-foreground">
                                        2 items - $99.00
                                    </div>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Order Details
                                            </DialogTitle>
                                            <div>
                                                <DialogDescription>
                                                    Order ID: {order.productId}
                                                </DialogDescription>
                                                <DialogDescription>
                                                    Customer: {order.userId}
                                                </DialogDescription>
                                                {/* {order.product.map(
                                                    (item: any, index: any) => (
                                                        <DialogDescription
                                                            key={index}
                                                        >
                                                            Product: {item.name}
                                                            Price: {item.price}
                                                            Quantity:
                                                            {item.quantity}
                                                        </DialogDescription>
                                                    )
                                                )} */}
                                                <DialogDescription>
                                                    Date: {order.createdAt}
                                                </DialogDescription>
                                                <DialogDescription>
                                                    Status: {order.status}
                                                </DialogDescription>
                                                <DialogDescription>
                                                    Total: ${order.total}
                                                </DialogDescription>
                                            </div>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Orders;
