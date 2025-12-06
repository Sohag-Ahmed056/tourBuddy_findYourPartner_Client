
// components/DeleteTravelButton.tsx
'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
 // adjust path as needed
import { toast } from 'sonner' // or your toast library
import deleteTravel from '@/services/travels/deleteTravel'

export function DeleteTravelButton({ planId }: { planId: string }) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        // Confirmation dialog
        if (!confirm('Are you sure you want to delete this travel plan? This action cannot be undone.')) {
            return
        }
        
        setIsDeleting(true)
        
        try {
            const result = await deleteTravel(planId)
            
            if (result.success) {
                toast.success('Travel plan deleted successfully!')
                router.refresh() // Refresh server component data
            } else {
                toast.error('Failed to delete travel plan')
                console.error('Delete error:', result.message)
            }
        } catch (error) {
            toast.error('An error occurred while deleting')
            console.error('Delete error:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-2"
        >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
    )
}