// components/EditTravelButton.tsx
'use client'

import { Pencil } from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { toast } from 'sonner' // or your toast library
import updateTravel from '@/services/travels/editTravelPlan'



export function EditTravelButton({ plan }: { plan: any }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: plan.title,
    destination: plan.destination,
    city: plan.city,
    startDate: new Date(plan.startDate).toISOString().split('T')[0],
    endDate: new Date(plan.endDate).toISOString().split('T')[0],
    budgetMin: plan.budgetMin,
    budgetMax: plan.budgetMax,
    travelType: plan.travelType,
    description: plan.description,
    visibility: plan.visibility,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await updateTravel(plan.id, formData)

      if (result.success) {
        toast.success('Travel plan updated successfully!')
        setOpen(false)
        router.refresh()
      } else {
        toast.error(result.message || 'Failed to update travel plan')
      }
    } catch (error) {
      toast.error('An error occurred while updating')
      console.error('Update error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="inline-flex items-center gap-2">
          <Pencil className="w-4 h-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Travel Plan</DialogTitle>
          <DialogDescription>
            Update your travel plan details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => handleChange('destination', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgetMin">Min Budget (BDT)</Label>
              <Input
                id="budgetMin"
                type="number"
                value={formData.budgetMin}
                onChange={(e) => handleChange('budgetMin', Number(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budgetMax">Max Budget (BDT)</Label>
              <Input
                id="budgetMax"
                type="number"
                value={formData.budgetMax}
                onChange={(e) => handleChange('budgetMax', Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelType">Travel Type</Label>
            <Select
              value={formData.travelType}
              onValueChange={(value) => handleChange('travelType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select travel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADVENTURE">Adventure</SelectItem>
                <SelectItem value="LEISURE">Leisure</SelectItem>
                <SelectItem value="BUSINESS">Business</SelectItem>
                <SelectItem value="FAMILY">Family</SelectItem>
                <SelectItem value="SOLO">Solo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select
              value={formData.visibility}
              onValueChange={(value) => handleChange('visibility', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Public</SelectItem>
                <SelectItem value="false">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              required
            />
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
              {isSubmitting ? 'Updating...' : 'Update Travel Plan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}