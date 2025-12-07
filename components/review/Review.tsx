"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { submitReview } from "@/services/review/submitReview";
;

export default function ReviewDialog({ id }: { id: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(submitReview, null);

  const handleRatingClick = (value: number) => setRating(value);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Review submitted successfully!");
      setOpen(false);
      setRating(0);
      setComment("");
    } else if (state.message) {
      const msg = typeof state.message === 'string' ? state.message : state.message?.message || 'Something went wrong.';
      toast.error(msg);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl px-6">Review</Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Submit Review</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={id} />

          <div className="flex gap-2">
            {[1,2,3,4,5].map((value) => (
              <Star 
                key={value} 
                className={`cursor-pointer ${value <= rating ? 'text-yellow-400' : 'text-gray-400'}`} 
                onClick={() => handleRatingClick(value)}
              />
            ))}
            <input type="hidden" name="rating" value={rating} />
          </div>

          <Textarea
            name="comment"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[120px]"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl px-6">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="rounded-xl px-6" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
