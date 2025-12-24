"use client";

import { useState, useEffect, useActionState } from "react";
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

import { toast } from "sonner";
import { sendJoinRequest } from "@/services/join/sendJoinRequest";


export default function JoinDialog({ id }: { id: string }) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(sendJoinRequest, null);

  useEffect(() => {
  if (!state) return;

  if (state.success) {
    toast.success("Request sent successfully!");
    setOpen(false);
    setMessage("");
  } else if (state.message) {
    
    const msg =
      typeof state.message === "string"
        ? state.message
        : state.message?.message || "Something went wrong. Please try again.";
    toast.error(msg);
  }
}, [state]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {state && state.success ? (
        <Button className="rounded-xl px-6" disabled>Request Sent</Button>
        ) : (
          <Button className=" w-full rounded-xl px-6">Join</Button>
        )}
      </DialogTrigger>

      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Join Request</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={id} />

          <Textarea
            name="message"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px]"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl px-6">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="rounded-xl px-6" disabled={isPending}>
              {isPending ? "Sending..." : "Send"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}