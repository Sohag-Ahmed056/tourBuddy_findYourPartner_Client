"use client";

import React, { useState, useActionState } from "react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Calendar, DollarSign, FileText, MapPin, Plane, Users, X } from "lucide-react";
 // your server action
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createTravelPlan } from "@/services/travels/createTravelPlan";

const CreateTravelPlanFormDialog = () => {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createTravelPlan, null);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
          <Plane className="h-5 w-5" />
          Create Travel Plan
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 dialog-shadow">
        {/* Header with gradient */}
        <div className="travel-gradient p-6 pb-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold text-foreground flex items-center gap-3">
              <div className="p-2 bg-primary-foreground/20 rounded-xl backdrop-blur-sm">
                <MapPin className="h-6 w-6" />
              </div>
              Create New Travel Plan
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Plan your next adventure with all the details in one place
            </DialogDescription>
          </DialogHeader>
        </div>

        <form action={formAction} className="p-6 -mt-4 bg-card rounded-t-2xl">
          <FieldGroup className="space-y-6">
            {/* Trip Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Trip Details
              </h3>
              
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input 
                  name="title" 
                  placeholder="e.g., Trip to Cox's Bazar" 
                  required 
                  className="h-11"
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Destination</FieldLabel>
                  <Input 
                    name="destination" 
                    placeholder="Country" 
                    required 
                    className="h-11"
                  />
                </Field>

                <Field>
                  <FieldLabel>City</FieldLabel>
                  <Input 
                    name="city" 
                    placeholder="City name" 
                    required 
                    className="h-11"
                  />
                </Field>
              </div>
            </div>

            {/* Dates Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Travel Dates
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Start Date</FieldLabel>
                  <Input 
                    name="startDate" 
                    type="date" 
                    required 
                    className="h-11"
                  />
                </Field>

                <Field>
                  <FieldLabel>End Date</FieldLabel>
                  <Input 
                    name="endDate" 
                    type="date" 
                    required 
                    className="h-11"
                  />
                </Field>
              </div>
            </div>

            {/* Budget Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Budget Range
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Minimum Budget</FieldLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input 
                      name="budgetMin" 
                      type="number" 
                      placeholder="0" 
                      required 
                      className="h-11 pl-7"
                    />
                  </div>
                </Field>

                <Field>
                  <FieldLabel>Maximum Budget</FieldLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input 
                      name="budgetMax" 
                      type="number" 
                      placeholder="0" 
                      required 
                      className="h-11 pl-7"
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* Travel Type Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Users className="h-4 w-4" />
                Travel Type
              </h3>
              
              <Field>
                <FieldLabel>Who's traveling?</FieldLabel>
                <Select name="travelType">
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select travel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOLO">
                      <span className="flex items-center gap-2">
                        🧳 Solo Adventure
                      </span>
                    </SelectItem>
                    <SelectItem value="GROUP">
                      <span className="flex items-center gap-2">
                        👥 Group Trip
                      </span>
                    </SelectItem>
                    <SelectItem value="FAMILY">
                      <span className="flex items-center gap-2">
                        👨‍👩‍👧‍👦 Family Vacation
                      </span>
                    </SelectItem>
                    <SelectItem value="FRIENDS">
                      <span className="flex items-center gap-2">
                        🎉 Friends Getaway
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {/* Description */}
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                name="description"
                placeholder="Describe your travel plan, activities, places you want to visit..."
                required
                className="min-h-[100px] resize-none"
              />
            </Field>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                className="flex-1 h-12 font-semibold"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Create Plan
                  </span>
                )}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTravelPlanFormDialog;
