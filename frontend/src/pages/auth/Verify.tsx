import OtpCard from "@/components/reuseable/InputOtp";

const VerifyOtp = () => {
    return (
        <div>
            <OtpCard
                title="Verify OTP"
                description="Enter the OTP sent to your email"
            />
        </div>
    );
};

export default VerifyOtp;
