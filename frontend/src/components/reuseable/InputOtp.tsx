// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardTitle,
// } from "@/components/ui/card";
// import {
//     InputOTP,
//     InputOTPGroup,
//     InputOTPSeparator,
//     InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { Button } from "../ui/button";
// interface InputOtpProps {
//     title: string;
//     description: string;
// }
//
// const OtpCard = (data: InputOtpProps) => {
//     return (
//         <div className="h-screen w-full flex items-center justify-center  bg-red-400">
//             <div>
//                 <Card className="max-w-[18rem] h-[400px] px-3 py-4 border-6 rounded-3xl bg-white">
//                     <CardTitle className="py-">{data.title}</CardTitle>
//                     <CardDescription className="text-md pt-6">
//                         {data.description}
//                     </CardDescription>
//                     <CardContent className="flex justify-center items-center pt-4">
//                         <InputOTP maxLength={6}>
//                             <InputOTPGroup>
//                                 <InputOTPSlot index={0} />
//                                 <InputOTPSlot index={1} />
//                                 <InputOTPSlot index={2} />
//                             </InputOTPGroup>
//                             <InputOTPSeparator />
//                             <InputOTPGroup>
//                                 <InputOTPSlot index={3} />2
//                                 <InputOTPSlot index={4} />
//                                 <InputOTPSlot index={5} />
//                             </InputOTPGroup>
//                         </InputOTP>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// };
//
// export default OtpCard;
