import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { sendVerificationEmail } from "@/lib/verificationMail";
import { useRouter } from "next/navigation";
interface UserData {
  email: string;
}

const EmailVerification: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const initialLoadRef = useRef(true);

  const router = useRouter();

  // Initialize input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData?.email && initialLoadRef.current) {
      initialLoadRef.current = false;
      sendOtp(userData.email);
    }
  }, [userData]);


  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const sendOtp = (email: string) => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setCountdown(90);
    setOtp(Array(4).fill(""));

    sendVerificationEmail(email, newOtp);
    toast("verify email!");
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        if (data.emailVerified) {
          router.push("/auth/login");
          return;
        }
        setUserData({ email: data.email });
        // sendOtp(data.email);
      } else {
        router.push("/auth/login");
        // toast.error("Failed to fetch user data");
      }
    } catch (error) {
      router.push("/auth/login");
      toast.error("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (index === 3 && value) {
      const enteredOtp = newOtp.join("");
      if (enteredOtp.length === 4) {
        verifyOtp(enteredOtp);
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d{4}$/.test(pastedData)) return;

    const digits = pastedData.split("");
    setOtp(digits);
    inputRefs.current[3]?.focus();
  };

  const verifyOtp = async (enteredOtp: string) => {
    if (enteredOtp === generatedOtp) {
      console.log("emial in vefify otp", userData?.email);
      console.log(enteredOtp);
      console.log(generatedOtp);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifymail `,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userData?.email,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          toast.success("Email verified successfully!");
          router.push(`/dashboard`);
        } else {
          toast.error("Verification failed");
        }
      } catch (error) {
        toast.error("Error during verification");
      }
    } else {
      console.log(enteredOtp);
      console.log(generatedOtp);
      toast.error("Invalid OTP");
    }
  };

  if (loading && userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Verify Your Email
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Enter the 4-digit code sent to
          <br />
          <span className="font-medium text-gray-800">{userData?.email}</span>
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-14 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          ))}
        </div>

        <button
          onClick={() => sendOtp(userData?.email ? userData.email : "")}
          disabled={countdown > 0}
          className={`w-full p-3 rounded-lg flex items-center justify-center gap-2 ${
            countdown > 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          {countdown > 0 ? <>Resend code in {countdown}s</> : "Resend Code"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
