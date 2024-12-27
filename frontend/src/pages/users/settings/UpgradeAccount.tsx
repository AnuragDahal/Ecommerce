// filepath: /home/anurag/Desktop/personal/Ecommerce/frontend/src/pages/users/settings/UpgradeAccount.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSellerAccountCreationService } from "@/services/useSellerServices";
import { useToast } from "@/hooks/use-toast";
import { ToastClose } from "@/components/ui/toast";
import { createSellerSchema } from "@/schema";
import { z } from "zod";

const UpgradeAccount = () => {
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof createSellerSchema>>({
        resolver: zodResolver(createSellerSchema),
    });

    const mutation = useMutation({
        mutationFn: useSellerAccountCreationService,
        onSuccess: () => {
            toast({
                title: "Account upgrade successful!",
                description:
                    "You have been successfully upgraded to a business account. You can now start selling your products.",
                variant: "success",
            });
        },
        onError: (data) => {
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

    const onSubmit = (data: z.infer<typeof createSellerSchema>) => {
        mutation.mutate(data);
    };

    return (
        <div className="flex justify-center py-5 w-full">
            <Card className="min-w-[20rem] max-w-4xl border-muted-foreground shadow-lg backdrop-blur-lg w-full">
                <CardHeader>
                    <CardTitle className="text-center">
                        Upgrade to Business Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="storeName">Store Name</Label>
                            <Input
                                id="storeName"
                                type="text"
                                {...register("storeName")}
                                placeholder="Enter your store name"
                                required
                            />
                            {errors.storeName && (
                                <p className="text-red-500">
                                    {errors.storeName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="businessEmail">
                                Business Email
                            </Label>
                            <Input
                                id="businessEmail"
                                type="email"
                                {...register("businessEmail")}
                                placeholder="Enter your business email"
                                required
                            />
                            {errors.businessEmail && (
                                <p className="text-red-500">
                                    {errors.businessEmail.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="paymentDetails">
                                Payment Details
                            </Label>
                            <Input
                                id="paymentDetails"
                                type="text"
                                {...register(
                                    "paymentDetails.0.bankAccountNumber"
                                )}
                                placeholder="Enter your bank account number"
                                required
                            />
                            {errors.paymentDetails && (
                                <p className="text-red-500">
                                    {
                                        errors.paymentDetails[0]
                                            ?.bankAccountNumber?.message
                                    }
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="contactPhone">Contact Phone</Label>
                            <Input
                                id="contactPhone"
                                type="text"
                                {...register("contact.0.phone")}
                                placeholder="Enter your contact phone number"
                                required
                            />
                            {errors.contact && (
                                <p className="text-red-500">
                                    {errors.contact[0]?.phone?.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="contactEmail">Contact Email</Label>
                            <Input
                                id="contactEmail"
                                type="email"
                                {...register("contact.0.email")}
                                placeholder="Enter your contact email"
                                required
                            />
                            {errors.contact && (
                                <p className="text-red-500">
                                    {errors.contact[0]?.email?.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="street">Street</Label>
                            <Input
                                id="street"
                                type="text"
                                {...register("address.street")}
                                placeholder="Enter your street"
                                required
                            />
                            {errors.address?.street && (
                                <p className="text-red-500">
                                    {errors.address.street.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                type="text"
                                {...register("address.city")}
                                placeholder="Enter your city"
                                required
                            />
                            {errors.address?.city && (
                                <p className="text-red-500">
                                    {errors.address.city.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                type="text"
                                {...register("address.country")}
                                placeholder="Enter your country"
                                required
                            />
                            {errors.address?.country && (
                                <p className="text-red-500">
                                    {errors.address.country.message}
                                </p>
                            )}
                        </div>
                        <Button
                            className="w-full"
                            type="submit"
                            variant={"auth"}
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
