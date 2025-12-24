import { decodeUser } from '@/services/profile/decodeUser';
import ChatSidebar from '@/components/chat/chatSidebar';
import { getChatList } from '@/services/chat/myChat';
import MobileNav from '@/components/chat/chatMobileSidebar';
; // Import the action

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  // Fetch data using the Server Action and Service
  const [{ data: conversations }, user] = await Promise.all([
    getChatList(),
    decodeUser()
  ]);

  const currentUserId = user?.id;
  const hasSelectedChat = !!children;

  // Define sidebar content for the MobileNav wrapper
  const sidebarContent = (
    <aside className="flex flex-col h-full w-full md:w-80 lg:w-[380px] border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex p-5 items-center justify-between border-b border-gray-50 dark:border-gray-800/50">
        
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatSidebar conversations={conversations} currentUserId={currentUserId} />
      </div>
    </aside>
  );

  return (
    <div className="flex h-[calc(100dvh-64px)] w-full overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      
      {/* Client Component that handles the Mobile Toggle Logic */}
      <MobileNav sidebar={sidebarContent} hasSelectedChat={hasSelectedChat} />

      {/* Main Content */}
      <main className={`
        ${hasSelectedChat ? 'flex' : 'hidden md:flex'} 
        flex-1 flex-col min-w-0 bg-slate-50/30 dark:bg-gray-900/10 relative z-10
      `}>
        {children ? (
          <div className="flex-1 flex flex-col h-full animate-in fade-in slide-in-from-right-2 duration-300">
            {children}
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center flex-col p-8 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-10 rounded-full"></div>
              <div className="relative p-6 rounded-3xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Select a Conversation</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto text-sm leading-relaxed">
              Choose a teammate from the list to view your message history and start collaborating.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}