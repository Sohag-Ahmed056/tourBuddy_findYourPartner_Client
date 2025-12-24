// src/utils/chatHelpers.ts
export const getOtherParticipant = (conversation: any, currentUserId: string) => {
  if (conversation.participantAId === currentUserId) {
    return conversation.participantB;
  }
  return conversation.participantA;
};