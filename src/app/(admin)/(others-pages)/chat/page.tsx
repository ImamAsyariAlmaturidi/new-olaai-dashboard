"use client";

import ChatBox, { ChatMessage } from "@/components/chats/ChatBox";
import ChatSidebar from "@/components/chats/ChatSidebar";
import React, { useEffect, useRef, useState } from "react";

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
  const initialConversationLoadRef = useRef(false);
  const initialMessagesLoadRef = useRef(false);
  const selectedConversationIdRef = useRef<string | null>(null);

  useEffect(() => {
    selectedConversationIdRef.current = selectedConversationId;
  }, [selectedConversationId]);

  useEffect(() => {
    let isActive = true;

    const fetchConversations = async () => {
      if (!initialConversationLoadRef.current) {
        setLoadingConversations(true);
      }
      try {
        const res = await fetch("/api/chat/conversations", {
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Tidak dapat memuat percakapan");
        }
        if (!isActive) return;
        setConversations(data.conversations ?? []);
        if (
          !selectedConversationIdRef.current &&
          data.conversations?.length
        ) {
          setSelectedConversationId(data.conversations[0].id);
        }
        initialConversationLoadRef.current = true;
      } catch (err) {
        if (!isActive) return;
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        if (!isActive) return;
        setLoadingConversations(false);
      }
    };

    fetchConversations();
    const intervalId = setInterval(fetchConversations, 5000);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    initialMessagesLoadRef.current = false;

    if (!selectedConversationId) {
      setMessages([]);
      setLoadingMessages(false);
      return;
    }

    const fetchMessages = async () => {
      if (!isActive) return;
      if (!initialMessagesLoadRef.current) {
        setLoadingMessages(true);
      }
      try {
        const res = await fetch(
          `/api/chat/conversations/${selectedConversationId}/messages`,
          { cache: "no-store" }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Tidak dapat memuat pesan");
        }
        if (!isActive) return;
        setMessages(data.messages ?? []);
        initialMessagesLoadRef.current = true;
      } catch (err) {
        if (!isActive) return;
        setError(err instanceof Error ? err.message : "Gagal ambil pesan");
      } finally {
        if (!isActive) return;
        setLoadingMessages(false);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 3000);
    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
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
