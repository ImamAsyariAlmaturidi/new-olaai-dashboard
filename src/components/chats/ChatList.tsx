import React, { useMemo, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "@/icons";
import type { ChatConversationSummary } from "./ChatSidebar";

interface ChatListProps {
  isOpen: boolean;
  onToggle: () => void;
  conversations: ChatConversationSummary[];
  selectedConversationId: string | null;
  onConversationSelect: (conversationId: string) => void;
}

const formatLastActive = (value: ChatConversationSummary["lastMessageAt"]) => {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", {
    month: "short",
    year: "numeric",
  }).format(date);
};

export default function ChatList({
  isOpen,
  onToggle,
  conversations,
  selectedConversationId,
  onConversationSelect,
}: ChatListProps) {
  const [isOpenTwo, setIsOpenTwo] = useState(false);

  function toggleDropdownTwo() {
    setIsOpenTwo(!isOpenTwo);
  }

  function closeDropdownTwo() {
    setIsOpenTwo(false);
  }

  const normalizedConversations = useMemo(
    () => conversations ?? [],
    [conversations],
  );
  return (
    <div
      className={`flex-col overflow-auto no-scrollbar transition-all duration-300 ${
        isOpen
          ? "fixed top-0 left-0 z-999999 h-screen bg-white dark:bg-gray-900"
          : "hidden xl:flex"
      }`}
    >
      <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800 xl:hidden">
        <div>
          <h3 className="font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Chat
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <div>
            <button className="dropdown-toggle" onClick={toggleDropdownTwo}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
            <Dropdown
              isOpen={isOpenTwo}
              onClose={closeDropdownTwo}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={closeDropdownTwo}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View More
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdownTwo}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
          <button
            onClick={onToggle}
            className="flex items-center justify-center w-10 h-10 text-gray-700 transition border border-gray-300 rounded-full dark:border-gray-700 dark:text-gray-400 dark:hover:text-white/90"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col max-h-full px-4 overflow-auto sm:px-5">
        <div className="max-h-full space-y-1 overflow-auto custom-scrollbar">
          {normalizedConversations.length ? (
            normalizedConversations.map((conv) => {
              const selected = conv.id === selectedConversationId;
              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => {
                    onConversationSelect(conv.id);
                    if (isOpen) onToggle();
                  }}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-left transition ${
                    selected
                      ? "bg-gray-100 dark:bg-white/[0.06]"
                      : "hover:bg-gray-100 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="w-full min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h5 className="truncate text-sm font-medium text-gray-800 dark:text-white/90">
                          {conv.patientId || "Unknown"}
                        </h5>
                        <div className="mt-0.5 flex min-w-0 items-center gap-2">
                          <span className="shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600 dark:bg-white/[0.06] dark:text-gray-300">
                            {conv.channel || "—"}
                          </span>
                          {conv.lastMessage?.text ? (
                            <span className="min-w-0 truncate text-xs text-gray-500 dark:text-gray-400">
                              {conv.lastMessage.text}
                            </span>
                          ) : (
                            <span className="min-w-0 truncate text-xs text-gray-400 dark:text-gray-500">
                              (no messages)
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 text-[11px] text-gray-400">
                        {formatLastActive(conv.lastMessageAt)}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="px-3 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Tidak ada percakapan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
