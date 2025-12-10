"use client"

import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleContinue = () => {
    router.push("/dashboard");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  useEffect(() => {
    // Simulate checking payment status
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Your subscription has been activated. You now have unlimited access to all features!
        </p>

        {/* Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Plan</span>
            <span className="font-semibold text-gray-900">Monthly Premium</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Amount</span>
            <span className="font-semibold text-gray-900">$28.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Next billing</span>
            <span className="font-semibold text-gray-900">
              {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-all mb-3"
        >
          Start Creating
        </button>
        
      </div>
    </div>
  );
}