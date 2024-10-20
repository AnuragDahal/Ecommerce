import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ManageProducts = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {["Product A", "Product B", "Product C"].map(
                            (product, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border-b pb-2"
                                >
                                    <div>
                                        <p className="font-medium">{product}</p>
                                        <p className="text-sm text-muted-foreground">
                                            In stock: 50
                                        </p>
                                    </div>
                                    <div className="space-x-2">
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                        <Button variant="destructive" size="sm">
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageProducts;
