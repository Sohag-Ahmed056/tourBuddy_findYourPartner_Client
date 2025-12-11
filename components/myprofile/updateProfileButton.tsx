// components/UpdateProfileButton.tsx
"use client";

import { UserPen } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";

import { useActionState } from "react";
import { updateUser } from "@/services/profile/updateProfile";

export function UpdateProfileButton({ profile }: { profile: any }) {
  const [open, setOpen] = useState(false);
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(profile.profileImage || "");

  const [formValues, setFormValues] = useState({
    fullName: profile.fullName || "",
    bio: profile.bio || "",
    currentLocation: profile.currentLocation || "",
    visitedCountries: profile.visitedCountries?.join(", ") || "",
    interests: profile.interests?.join(", ") || "",
  });

  const [state, formAction, isPending] = useActionState(updateUser, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Profile updated successfully!");
      setOpen(false);
    } else if (state.message) {
      toast.error(state.message || "Update failed");
    }
  }, [state]);

  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setLocalFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // THIS sends the FormData directly to the server action
  const handleClientSubmit = (formData: FormData) => {
    // Inject the real values from component state
    const fd = new FormData();

    fd.append("fullName", formValues.fullName);
    fd.append("bio", formValues.bio);
    fd.append("currentLocation", formValues.currentLocation);
    fd.append("visitedCountries", formValues.visitedCountries);
    fd.append("interests", formValues.interests);

    if (localFile instanceof File) {
      fd.append("file", localFile);
    }

    return formAction(fd);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2">
          <UserPen className="w-4 h-4" />
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information below.</DialogDescription>
        </DialogHeader>

        <form action={handleClientSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formValues.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formValues.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentLocation">Current Location</Label>
            <Input
              id="currentLocation"
              value={formValues.currentLocation}
              onChange={(e) => handleChange("currentLocation", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitedCountries">Visited Countries</Label>
            <Input
              id="visitedCountries"
              value={formValues.visitedCountries}
              onChange={(e) => handleChange("visitedCountries", e.target.value)}
              placeholder="Japan, India, Thailand"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Interests</Label>
            <Input
              id="interests"
              value={formValues.interests}
              onChange={(e) => handleChange("interests", e.target.value)}
              placeholder="Adventure, Food, Photography"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image</Label>
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(e.target.files ? e.target.files[0] : null)
              }
            />

            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
