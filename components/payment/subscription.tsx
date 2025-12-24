"use client";

import { createPaymentSession } from "@/services/payment/createPayment";
import { AlertCircle, Check, CreditCard, Loader2, Sparkles } from "lucide-react";
import { useActionState, useEffect } from "react";

function SubscriptionPlans() {
  const [state, formAction, isPending] = useActionState(createPaymentSession, null);

  useEffect(() => {
    if (state?.success && state?.url) {
      window.open(state.url, "_blank");
    }
  }, [state]);

  const plans = [
    {
      name: 'Monthly',
      planType: 'MONTHLY',
      price: 28,
      duration: '/month',
      savings: 'Save 10% on annual billing',
      features: [
        'Unlimited travel plans',
        'AI-powered recommendations',
        'Priority support',
        'Export itineraries',
        'Collaborative planning'
      ],
      popular: true // Set to true to show the dark/light mode gradient effect
    }
  ];

  return (
    // Standardized container alignment
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Header - Uses foreground colors for automatic light/dark swapping */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <AlertCircle className="w-4 h-4" />
          You&apos;ve reached your plan limit
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
          Upgrade Your Experience
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Unlock the full potential of AI travel planning with our premium features.
        </p>
      </div>

      {/* Error Message */}
      {state && !state.success && (
        <div className="max-w-2xl mx-auto mb-8 bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          <p className="text-destructive-foreground text-sm font-medium">{state.message}</p>
        </div>
      )}

      {/* Plans Grid - Centered within the container */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full max-w-xl">
          {plans.map((plan) => (
            <div
              key={plan.planType}
              className={`relative group bg-card text-card-foreground rounded-3xl shadow-xl border-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-primary shadow-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Recommended
                  </span>
                </div>
              )}

              <div className="p-8 md:p-10">
                {/* Plan Header */}
                <div className="mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <Sparkles className="w-6 h-6 text-primary opacity-50" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold tracking-tight">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground font-medium">{plan.duration}</span>
                  </div>
                  {plan.savings && (
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold mt-3 bg-emerald-50 dark:bg-emerald-950/30 w-fit px-3 py-1 rounded-lg">
                      {plan.savings}
                    </p>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 bg-primary/10 rounded-full p-1">
                         <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Subscription Form */}
                <form action={formAction}>
                  <input type="hidden" name="planType" value={plan.planType} />
                  <input type="hidden" name="price" value={plan.price} />

                  <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    } disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]`}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Validating Session...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Upgrade Now
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-xs text-muted-foreground mt-6">
                  Secure payment via Stripe. Cancel anytime.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlans;