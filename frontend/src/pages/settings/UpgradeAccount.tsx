import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSellerAccountCreationService } from "@/services/useSellerServices";
import { useToast } from "@/hooks/use-toast";
import { ToastClose } from "@/components/ui/toast";

const UpgradeAccount = () => {
    const [storeName, setStoreName] = useState("");
    const [businessEmail, setBusinessEmail] = useState("");
    const [contact, setContact] = useState("");
    const [businessLogo, setBusinessLogo] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const { toast } = useToast();
    const AccountData = {
        storeName,
        businessEmail,
        contact: [
            {
                phone: contact,
                email: businessEmail,
            },
        ],
        // imageUrl: businessLogo,
        address: businessAddress,
    };
    const mutation = useMutation({
        mutationFn: useSellerAccountCreationService,
        onSuccess: () => {
            console.log(AccountData);
            toast({
                title: "Account upgrade successful!",
                description:
                    "You have been successfully upgraded to a business account.You can now start selling your products.",
                variant: "success",
            });
        },
        onError: (data) => {
            console.log(AccountData);
            toast({
                title: "Account upgrade failed!",
                description: data.message,
                variant: "destructive",
                action: (
                    <ToastClose>
                        <Button>Close</Button>
                    </ToastClose>
                ),
            });
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(AccountData);
    };

    return (
        <div className="flex justify-center py-5">
            <Card className="min-w-[20rem] border-muted-foreground shadow-lg backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="text-center">
                        Upgrade to Business Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="businessName">Store Name</Label>
                            <Input
                                id="businessName"
                                type="text"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
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
                                value={businessEmail}
                                onChange={(e) =>
                                    setBusinessEmail(e.target.value)
                                }
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
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
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
                                value={businessAddress}
                                onChange={(e) =>
                                    setBusinessAddress(e.target.value)
                                }
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
