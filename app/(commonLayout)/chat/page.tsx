// src/app/chat/page.tsx
export default function ChatLandingPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-muted/10">
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
          <svg 
            className="h-8 w-8 text-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Select a conversation</h3>
        <p className="text-sm text-muted-foreground">
          Choose a chat from the sidebar to start messaging.
        </p>
      </div>
    </div>
  );
}