"use client"


import { handleJoinRequest } from "@/services/join/acceptJoinRequest"
import { useState } from "react"

export function JoinRequestDropdown({ id }: { id: any }) {
  const [isPending, setIsPending] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedAction) return
    
    setIsPending(true)
    
    const formData = new FormData(e.currentTarget)
    await handleJoinRequest(formData)
    
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input type="hidden" name="requestId" value={id} />
      
      <select
        name="accept"
        value={selectedAction}
        onChange={(e) => setSelectedAction(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isPending}
      >
        <option value="">Select action...</option>
        <option value="true">Accept</option>
        <option value="false">Reject</option>
      </select>
      
      <button
        type="submit"
        disabled={isPending || !selectedAction}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Processing...' : 'Submit'}
      </button>
    </form>
  )
}