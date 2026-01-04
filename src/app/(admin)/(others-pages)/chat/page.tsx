"use client";

import ChatBox, { ChatMessage } from "@/components/chats/ChatBox";
import ChatSidebar from "@/components/chats/ChatSidebar";
import React, { useEffect, useState } from "react";

type ConversationSummary = {
  id: string;
  patientId: string;
  assignedAgent?: string;
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

export default function Chat() {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = async () => {
    setLoadingConversations(true);
    try {
      const res = await fetch("/api/chat/conversations", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Tidak dapat memuat percakapan");
      }
      setConversations(data.conversations ?? []);
      if (!selectedConversationId && data.conversations?.length) {
        setSelectedConversationId(data.conversations[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoadingConversations(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversationId) return;
      setLoadingMessages(true);
      try {
        const res = await fetch(
          `/api/chat/conversations/${selectedConversationId}/messages`,
          { cache: "no-store" }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Tidak dapat memuat pesan");
        }
        setMessages(data.messages ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal ambil pesan");
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedConversationId]);

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };

  const selectedConversation =
    conversations.find((conv) => conv.id === selectedConversationId) ?? null;

  return (
    <div>
      <div className="h-[calc(100vh-150px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div className="flex flex-col h-full gap-6 xl:flex-row xl:gap-5">
          <ChatSidebar
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onConversationSelect={handleConversationSelect}
          />
          <ChatBox
            conversation={selectedConversation}
            messages={messages}
            loading={loadingMessages}
          />
        </div>
        {loadingConversations && (
          <p className="mt-3 text-center text-sm text-gray-500">
            Memuat daftar percakapan...
          </p>
        )}
        {error && (
          <p className="mt-3 text-center text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}
