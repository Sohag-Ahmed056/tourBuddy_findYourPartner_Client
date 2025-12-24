"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, User as UserIcon } from "lucide-react";
import { useActionState, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { loginUser } from "@/services/auth/LoginAction";

type LoginFormProps = React.ComponentProps<"form"> & {
  className?: string;
  redirectTo?: string;
};

export function LoginForm({ className, redirectTo, ...props }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(loginUser, null);
  
  // Refs to manually set values for demo fill
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Welcome back! Access granted.");
    } else if (state.message) {
      toast.error(state.message.message || "Invalid email or password.");
    }
  }, [state]);

  // Function to automatically fill credentials
  const fillCredentials = (email: string, pass: string) => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = email;
      passwordRef.current.value = pass;
      toast.info(`Form filled with ${email.split('@')[0]} credentials`);
    }
  };

  return (
    <form
      action={formAction}
      className={cn("flex flex-col gap-8", className)}
      {...props}
    >
      <FieldGroup className="space-y-6">
        {/* Email Field */}
        <Field className="space-y-2">
          <FieldLabel htmlFor="email" className="text-sm font-semibold tracking-tight">
            Email Address
          </FieldLabel>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
            <Input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10 h-12 bg-muted/30 border-border/50 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all rounded-xl shadow-sm"
              required
            />
          </div>
        </Field>

        {/* Password Field */}
        <Field className="space-y-2">
          <FieldLabel htmlFor="password" className="text-sm font-semibold tracking-tight">
            Password
          </FieldLabel>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
            <Input
              ref={passwordRef}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 h-12 bg-muted/30 border-border/50 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all rounded-xl shadow-sm"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>

        {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}

        <div className="pt-2 space-y-6">
          <Button 
            type="submit" 
            disabled={isPending} 
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" /> Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* DEMO ACCESS SECTION */}
          <div className="space-y-3">
            <p className="text-[10px] text-center font-bold uppercase tracking-widest text-muted-foreground/60">
              Demo Access
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg text-xs h-9 border-indigo-500/20 hover:bg-indigo-500/5 hover:text-indigo-600 dark:hover:bg-indigo-500/10"
                onClick={() => fillCredentials("admin@gmail.com", "admin123")}
              >
                <ShieldCheck className="size-3.5 mr-2" />
                Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg text-xs h-9 border-emerald-500/20 hover:bg-emerald-500/5 hover:text-emerald-600 dark:hover:bg-emerald-500/10"
                onClick={() => fillCredentials("sohag@gmail.com", "1234")}
              >
                <UserIcon className="size-3.5 mr-2" />
                User
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link 
              href="/register" 
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors underline-offset-4 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}