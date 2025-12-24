"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Eye, 
  EyeOff, 
  Loader2, 
  User, 
  Mail, 
  Lock, 
  Globe, 
  MapPin, 
  Heart, 
  FileText 
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { registerUser } from "@/services/auth/RegisterAction";

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Account created! Welcome to TourBuddy.");
    } else if (state.message) {
      toast.error(state.message.message || "Registration failed.");
    }
  }, [state]);

  const inputStyles = "pl-10 h-11 bg-muted/30 border-border/50 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all rounded-xl";
  const iconStyles = "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors";

  return (
    <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup className="space-y-5">
        
        {/* Section: Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field className="space-y-1.5">
            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Full Name</FieldLabel>
            <div className="relative group">
              <User className={iconStyles} />
              <Input id="fullName" name="fullName" placeholder="John Doe" className={inputStyles} required />
            </div>
          </Field>
          
          <Field className="space-y-1.5">
            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Email</FieldLabel>
            <div className="relative group">
              <Mail className={iconStyles} />
              <Input id="email" name="email" type="email" placeholder="john@example.com" className={inputStyles} required />
            </div>
          </Field>
        </div>

        {/* Section: Travel Identity */}
        <Field className="space-y-1.5">
          <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Bio</FieldLabel>
          <div className="relative group">
            <FileText className="absolute left-3 top-3 size-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell us about your travel style..."
              className="pl-10 min-h-[100px] bg-muted/30 border-border/50 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 rounded-xl resize-none"
              required
            />
          </div>
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field className="space-y-1.5">
            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Interests</FieldLabel>
            <div className="relative group">
              <Heart className={iconStyles} />
              <Input id="interests" name="interests" placeholder="Hiking, Art..." className={inputStyles} required />
            </div>
          </Field>
          
          <Field className="space-y-1.5">
            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Current Location</FieldLabel>
            <div className="relative group">
              <MapPin className={iconStyles} />
              <Input id="currentLocation" name="currentLocation" placeholder="London, UK" className={inputStyles} required />
            </div>
          </Field>
        </div>

        <Field className="space-y-1.5">
          <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Visited Countries</FieldLabel>
          <div className="relative group">
            <Globe className={iconStyles} />
            <Input id="visitedCountries" name="visitedCountries" placeholder="Italy, Japan, Mexico..." className={inputStyles} required />
          </div>
        </Field>

        {/* Section: Security */}
        <Field className="space-y-1.5">
          <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Password</FieldLabel>
          <div className="relative group">
            <Lock className={iconStyles} />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={inputStyles}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>

        <div className="pt-4 space-y-4">
          <Button 
            type="submit" 
            disabled={isPending} 
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" /> Creating Profile...
              </span>
            ) : (
              "Complete Registration"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already a member?{" "}
            <Link href="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}