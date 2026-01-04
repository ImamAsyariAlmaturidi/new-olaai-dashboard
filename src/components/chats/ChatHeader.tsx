"use client";
import ChatHeaderTitle from "./ChatHeaderTitle";

interface ChatHeaderProps {
  onToggle: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onToggle }) => {
  return (
    <div className="sticky px-4 xl:pb-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full text-gray-700 border border-gray-300 rounded-lg h-11 max-w-11 dark:border-gray-700 dark:text-gray-400 xl:hidden"
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.25 6C3.25 5.58579 3.58579 5.25 4 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75L4 6.75C3.58579 6.75 3.25 6.41422 3.25 6ZM3.25 18C3.25 17.5858 3.58579 17.25 4 17.25L20 17.25C20.4142 17.25 20.75 17.5858 20.75 18C20.75 18.4142 20.4142 18.75 20 18.75L4 18.75C3.58579 18.75 3.25 18.4142 3.25 18ZM4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75L20 12.75C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25L4 11.25Z"
              fill=""
            />
          </svg>
        </button>
        <div className="w-full py-4">
          <ChatHeaderTitle />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
