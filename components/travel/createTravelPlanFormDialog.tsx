"use client";

import React, { useState, useActionState } from "react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { X } from "lucide-react";
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
      {/* Button to open dialog */}
      <DialogTrigger asChild>
        <Button>Create Travel Plan</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>

        <DialogTitle className="text-xl font-semibold mb-4">
          Create New Travel Plan
        </DialogTitle>

        <form action={formAction} className="flex flex-col gap-6">
          <FieldGroup>
            {/* Title */}
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input name="title" placeholder="Trip to Cox's Bazar" required />
            </Field>

            {/* Destination */}
            <Field>
              <FieldLabel>Destination</FieldLabel>
              <Input name="destination" placeholder="Bangladesh" required />
            </Field>

            {/* City */}
            <Field>
              <FieldLabel>City</FieldLabel>
              <Input name="city" placeholder="CTG" required />
            </Field>

            {/* Dates */}
            <Field>
              <FieldLabel>Start Date</FieldLabel>
              <Input name="startDate" type="date" required />
            </Field>

            <Field>
              <FieldLabel>End Date</FieldLabel>
              <Input name="endDate" type="date" required />
            </Field>

            {/* Budgets */}
            <Field>
              <FieldLabel>Min Budget</FieldLabel>
              <Input name="budgetMin" type="number" required />
            </Field>

            <Field>
              <FieldLabel>Max Budget</FieldLabel>
              <Input name="budgetMax" type="number" required />
            </Field>

            {/* Travel Type Dropdown */}
            <Field>
              <FieldLabel>Travel Type</FieldLabel>
              <Select name="travelType">
                <SelectTrigger>
                  <SelectValue placeholder="Select travel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOLO">Solo</SelectItem>
                  <SelectItem value="GROUP">Group</SelectItem>
                  <SelectItem value="FAMILY">Family</SelectItem>
                  <SelectItem value="FRIENDS">Friends</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Visibility Dropdown
            <Field>
              <FieldLabel>Visibility</FieldLabel>
              <Select name="visibility">
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Visible (Public)</SelectItem>
                  <SelectItem value="false">Hidden (Private)</SelectItem>
                </SelectContent>
              </Select>
            </Field> */}

            {/* Description */}
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                name="description"
                placeholder="Describe your travel plan..."
                required
              />
            </Field>

            {/* Submit Button */}
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Create Plan"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTravelPlanFormDialog;
