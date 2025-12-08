"use client";

import { AlertCircle } from "lucide-react";

export function PaymentCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Cancel Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>

        {/* Cancel Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8">
          Your payment was cancelled. No charges have been made to your account.
        </p>

        {/* Actions */}
        <button
          onClick={() => window.location.href = '/subscribe'}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-all mb-3"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full text-gray-600 hover:text-gray-900 py-2 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}