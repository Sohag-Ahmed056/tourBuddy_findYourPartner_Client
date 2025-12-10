// components/UpdateProfileButton.tsx
'use client'

import { UserPen } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { toast } from 'sonner'
import updateUser from '@/services/profile/updateProfile'



export function UpdateProfileButton({ profile }: { profile: any }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    fullName: profile.fullName || '',
    bio: profile.bio || '',
    currentLocation: profile.currentLocation || '',
    visitedCountries: profile.visitedCountries?.join(', ') || '',
    interests: profile.interests?.join(', ') || '',
    profileImage: profile.profileImage || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const interestsArray = formData.interests
      .split(',')
      .map((i: string) => i.trim())
      .filter((i: string) => i.length > 0);

    const visitedCountriesArray = formData.visitedCountries
      .split(',')
      .map((c: string) => c.trim())
      .filter((c: string) => c.length > 0);

    const payload = {
      fullName: formData.fullName,
      bio: formData.bio,
      currentLocation: formData.currentLocation,
      visitedCountries: visitedCountriesArray,
      interests: interestsArray,
      ...(formData.profileImage && { profileImage: formData.profileImage }),
    };

    const result = await updateUser(payload);

    if (result.success) {
      toast.success('Profile updated successfully!');
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result.message || 'Failed to update profile');
    }
  } catch (error) {
    toast.error('An error occurred while updating');
    console.error('Update error:', error);
  } finally {
    setIsSubmitting(false);
  }
};


  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

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
          <DialogDescription>
            Update your profile information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentLocation">Current Location</Label>
            <Input
              id="currentLocation"
              value={formData.currentLocation}
              onChange={(e) => handleChange('currentLocation', e.target.value)}
              placeholder="e.g., Dhaka, Bangladesh"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitedCountries">Visited Countries</Label>
            <Input
              id="visitedCountries"
             
              min="0"
              value={formData.visitedCountries}
              onChange={(e) => handleChange('visitedCountries', e.target.value)}
              placeholder="Number of countries visited"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Interests</Label>
            <Input
              id="interests"
              value={formData.interests}
              onChange={(e) => handleChange('interests', e.target.value)}
              placeholder="e.g., Adventure, Photography, Food (comma-separated)"
            />
            <p className="text-xs text-gray-500">
              Separate multiple interests with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image URL</Label>
            <Input
              id="profileImage"
              type="url"
              value={formData.profileImage}
              onChange={(e) => handleChange('profileImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {formData.profileImage && (
              <div className="mt-2">
                <img
                  src={formData.profileImage}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-2"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}