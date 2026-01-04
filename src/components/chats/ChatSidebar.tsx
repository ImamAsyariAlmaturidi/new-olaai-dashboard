"use client";
import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatList from "./ChatList";

export type ChatConversationSummary = {
  id: string;
  patientId: string;
  channel?: string;
  status?: string;
  lastMessageAt?: string | number | Date | null;
  lastMessage?: {
    sender?: string;
    type?: string;
    text?: string;
    timestamp?: string | number | Date | null;
  } | null;
  metadata?: unknown;
};

interface ChatSidebarProps {
  conversations: ChatConversationSummary[];
  selectedConversationId: string | null;
  onConversationSelect: (conversationId: string) => void;
}

export default function ChatSidebar({
  conversations,
  selectedConversationId,
  onConversationSelect,
}: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 transition-all duration-300 bg-gray-900/50 z-999999"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="flex-col rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:flex xl:w-1/5 xl:flex-none">
        <ChatHeader onToggle={toggleSidebar} />
        <ChatList
          isOpen={isOpen}
          onToggle={toggleSidebar}
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onConversationSelect={onConversationSelect}
        />
      </div>
    </>
  );
}
