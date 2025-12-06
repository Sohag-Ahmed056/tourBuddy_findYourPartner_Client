"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Eye, EyeOff } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { registerUser } from "@/services/auth/RegisterAction";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(registerUser, null);
  console.log("RegisterForm state:", state);

  // 🧠 Trigger toast when state changes
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Account created successfully!");
    } else if (state.message) {
      toast.error(state.message.message || "Something went wrong. Please try again.");
    }
  }, [state]);

  return (
    <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm">
            Fill in the details to register your account
          </p>
        </div>

        {/* Full Name */}
        <Field>
          <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
          <Input id="fullName" name="fullName" type="text" placeholder="Sohag" required />
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="sohag@gmail.com" required />
        </Field>

        {/* Bio */}
        <Field>
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <Textarea
            id="bio"
            name="bio"
            placeholder="I love traveling around the world."
            required
            rows={3}
          />
        </Field>

        {/* Interests */}
        <Field>
          <FieldLabel htmlFor="interests">Interests</FieldLabel>
          <Input
            id="interests"
            name="interests"
            type="text"
            placeholder="hiking, photography, food"
            required
          />
          <FieldDescription>Separate interests with commas</FieldDescription>
        </Field>

        {/* Visited Countries */}
        <Field>
          <FieldLabel htmlFor="visitedCountries">Visited Countries</FieldLabel>
          <Input
            id="visitedCountries"
            name="visitedCountries"
            type="text"
            placeholder="France, Japan, Brazil"
            required
          />
          <FieldDescription>Separate countries with commas</FieldDescription>
        </Field>

        {/* Current Location */}
        <Field>
          <FieldLabel htmlFor="currentLocation">Current Location</FieldLabel>
          <Input
            id="currentLocation"
            name="currentLocation"
            type="text"
            placeholder="Dhaka, Bangladesh"
            required
          />
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </Field>

        {/* Register Button */}
        <Field>
          <Button type="submit">Register</Button>
        </Field>

        {/* Separator */}
        <FieldSeparator>Or continue with</FieldSeparator>

        {/* GitHub Login */}
        <Field>
          <Button
            variant="outline"
            type="button"
            className="flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Register with GitHub
          </Button>

          <FieldDescription className="text-center">
            Already have an account?{" "}
            <a href="/login" className="underline underline-offset-4">
              Login
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
