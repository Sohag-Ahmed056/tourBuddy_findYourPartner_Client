"use client";

import { createPaymentSession } from "@/services/payment/createPayment";
import { AlertCircle, Check, CreditCard, Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";

function SubscriptionPlans() {
  const [state, formAction, isPending] = useActionState(createPaymentSession, null);
useEffect(() => {
  if (state?.success && state?.url) {
    window.open(state.url, "_blank"); // <-- opens Stripe in new tab
  }
}, [state]);


  const plans = [
    {
      name: 'Monthly',
      planType: 'MONTHLY',
      price: 28,
      duration: '/month',
      savings:10,
      features: [
        'Unlimited travel plans',
        'AI-powered recommendations',
        'Priority support',
        'Export itineraries',
        'Collaborative planning'
      ],
      popular: false
    }
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <AlertCircle className="w-4 h-4" />
            You've reached your plan limit
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade Your Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Continue creating amazing travel experiences with unlimited access
          </p>
        </div>

        {/* Error/Success Message */}
        {state && !state.success && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{state.message}</p>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.planType}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all ${
                plan.popular
                  ? 'border-blue-500 shadow-blue-100'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">{plan.duration}</span>
                  </div>
                  {plan.savings && (
                    <p className="text-green-600 font-medium mt-2">
                      {plan.savings}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hidden Form */}
                <form action={formAction}>
                  <input type="hidden" name="planType" value={plan.planType} />
                  <input type="hidden" name="price" value={plan.price} />

                  <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Subscribe Now
                      </>
                    )}
                  </button>
                </form>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default SubscriptionPlans;
