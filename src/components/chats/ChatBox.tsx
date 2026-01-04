import React from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxSendForm from "./ChatBoxSendForm";
import type { ChatConversationSummary } from "./ChatSidebar";

export type ChatMessage = {
  id: string;
  sender: string;
  type?: string;
  text: string;
  timestamp?: string | number | Date;
  metadata?: unknown;
};

interface ChatBoxProps {
  conversation: ChatConversationSummary | null;
  messages: ChatMessage[];
  loading?: boolean;
}

const formatMessageTime = (value?: ChatMessage["timestamp"]) => {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function ChatBox({
  conversation,
  messages,
  loading,
}: ChatBoxProps) {
  return (
    <div className="flex h-full w-4/6 min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:w-[820px]">
      {/* <!-- ====== Chat Box Start --> */}
      <ChatBoxHeader
        title={conversation?.patientId}
        subtitle={
          conversation
            ? [
                conversation.channel
                  ? `Channel: ${conversation.channel}`
                  : null,
                conversation.status ? `Status: ${conversation.status}` : null,
                conversation.id ? `ID: ${conversation.id}` : null,
              ]
                .filter(Boolean)
                .join(" • ")
            : undefined
        }
      />
      <div className="flex-1 max-h-full p-5 space-y-6 overflow-auto custom-scrollbar xl:space-y-8 xl:p-6">
        {!conversation && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pilih conversation untuk melihat pesan.
            </p>
          </div>
        )}

        {conversation && loading && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Memuat pesan...
          </p>
        )}

        {conversation && !loading && !messages.length && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Belum ada pesan di conversation ini.
          </p>
        )}

        {conversation &&
          !loading &&
          messages.map((message) => {
            const isPatient = message.sender === "patient";
            return (
              <div
                key={message.id}
                className={`flex ${
                  isPatient ? "items-start gap-4" : "justify-end"
                }`}
              >
                {isPatient && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700 dark:bg-white/[0.06] dark:text-gray-200">
                    PT
                  </div>
                )}

                <div className={`${isPatient ? "" : "text-right"}`}>
                  <div
                    className={`inline-block max-w-[min(520px,80vw)] whitespace-pre-wrap break-words rounded-lg px-3 py-2 text-sm ${
                      isPatient
                        ? "bg-gray-100 text-gray-800 dark:bg-white/5 dark:text-white/90"
                        : "bg-brand-500 text-white dark:bg-brand-500"
                    } ${isPatient ? "rounded-tl-sm" : "rounded-tr-sm"}`}
                  >
                    {message.text}
                  </div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {message.sender}
                    {message.timestamp
                      ? ` • ${formatMessageTime(message.timestamp)}`
                      : ""}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <ChatBoxSendForm disabled />
      {/* <!-- ====== Chat Box End --> */}
    </div>
  );
}
