import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpgradeAccount = () => {
    return (
        <div className="flex justify-center py-5">
            <Card className="min-w-[20rem] border-muted-foreground shadow-lg backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="text-center">
                        Upgrade to Business Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="businessName">Store Name</Label>
                            <Input
                                id="businessName"
                                type="text"
                                placeholder="Enter your business name"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="businessEmail">
                                Business Email
                            </Label>
                            <Input
                                id="businessEmail"
                                type="text"
                                placeholder="Enter your business email"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="businessPhone">
                                Business Phone Number
                            </Label>
                            <Input
                                id="businessPhone"
                                type="text"
                                placeholder="Enter your business phone number"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="businessLogo">Logo</Label>
                            <Input
                                id="businessLogo"
                                type="file"
                                accept="image/"
                                size={1}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="businessAddress">
                                Business Address
                            </Label>
                            <Input
                                id="businessAddress"
                                type="text"
                                placeholder="Enter your business address"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full py-2 rounded-md"
                        >
                            Upgrade
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpgradeAccount;
