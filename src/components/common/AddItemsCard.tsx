"use client";
import { useModal } from "@/hooks/useModal";
import type React from "react";
import { useState } from "react";
import { Modal } from "../ui/modal";
import Label from "../form/Label";

import Button from "../ui/button/Button";
import { connectPlatform } from "@/app/actions/connectPlatform";

const AddItemsCard: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleConnect = async () => {
    if (!selectedPlatform) {
      setError("Please select a platform to connect");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const redirectUrl = await connectPlatform(
        selectedPlatform as "instagram" | "whatsapp"
      );
      window.open(
        redirectUrl,
        "InstagramConnectPopup",
        "width=600,height=700,top=100,left=200"
      );
    } catch (err) {
      console.error("Failed to connect platform:", err);
      setError("Failed to connect platform. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setSelectedPlatform("");
    setError("");
  };

  return (
    <div
      onClick={openModal}
      className="transition border-2 border-gray-300 border-double cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500"
    >
      <div className="dz-message flex flex-col items-center m-0!">
        {/* Icon Container */}
        <div className="mb-[22px] flex mt-[22px] justify-center">
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-green-300 text-gray-700 dark:bg-green-400 dark:text-gray-400">
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M5 12H19"
                  stroke="#323232"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 5L12 19"
                  stroke="#323232"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </div>
        </div>

        <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
          Click to Connect a Platform
        </span>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        className="max-w-[900px] p-5 lg:p-10"
      >
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
            Connect New Platform
          </h4>

          <div className="mb-8">
            <Label className="mb-4 block">Select Platform</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              <div
                onClick={() => setSelectedPlatform("instagram-business")}
                className={`cursor-pointer border rounded-lg p-6 text-center transition-all ${
                  selectedPlatform === "instagram-business"
                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20 shadow-md"
                    : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-400 via-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <h3
                  className={`text-lg font-semibold ${
                    selectedPlatform === "instagram-business"
                      ? "text-pink-700"
                      : "text-gray-900"
                  }`}
                >
                  Instagram Business
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    selectedPlatform === "instagram-business"
                      ? "text-pink-600"
                      : "text-gray-500"
                  }`}
                >
                  Connect your business account for advanced features
                </p>
                {selectedPlatform === "instagram-business" && (
                  <div className="mt-2">
                    <div className="w-4 h-4 bg-pink-500 rounded-full mx-auto"></div>
                  </div>
                )}
              </div>

              <div
                onClick={() => setSelectedPlatform("whatsapp")}
                className={`cursor-pointer border rounded-lg p-6 text-center transition-all ${
                  selectedPlatform === "whatsapp"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md"
                    : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                  </svg>
                </div>
                <h3
                  className={`text-lg font-semibold ${
                    selectedPlatform === "whatsapp"
                      ? "text-green-700"
                      : "text-gray-900"
                  }`}
                >
                  WhatsApp Business
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    selectedPlatform === "whatsapp"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  Standard WhatsApp Business integration
                </p>
                {selectedPlatform === "whatsapp" && (
                  <div className="mt-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
                  </div>
                )}
              </div>
              <div
                onClick={() => setSelectedPlatform("instagram")}
                className={`cursor-pointer border rounded-lg p-6 text-center transition-all ${
                  selectedPlatform === "instagram"
                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20 shadow-md"
                    : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-400 via-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <h3
                  className={`text-lg font-semibold ${
                    selectedPlatform === "instagram"
                      ? "text-pink-700"
                      : "text-gray-900"
                  }`}
                >
                  Instagram
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    selectedPlatform === "instagram"
                      ? "text-pink-600"
                      : "text-gray-500"
                  }`}
                >
                  Personal Instagram account connection
                </p>
                {selectedPlatform === "instagram" && (
                  <div className="mt-2">
                    <div className="w-4 h-4 bg-pink-500 rounded-full mx-auto"></div>
                  </div>
                )}
              </div>
              <div
                onClick={() => setSelectedPlatform("webchat")}
                className={`cursor-pointer border rounded-lg p-6 text-center transition-all ${
                  selectedPlatform === "webchat"
                    ? "border-gray-500 bg-gray-50 dark:bg-gray-800/20 shadow-md"
                    : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
                <h3
                  className={`text-lg font-semibold ${
                    selectedPlatform === "webchat"
                      ? "text-gray-700"
                      : "text-gray-900"
                  }`}
                >
                  Web Live Chat
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    selectedPlatform === "webchat"
                      ? "text-gray-600"
                      : "text-gray-500"
                  }`}
                >
                  Add live chat widget to your website
                </p>
                {selectedPlatform === "webchat" && (
                  <div className="mt-2">
                    <div className="w-4 h-4 bg-gray-500 rounded-full mx-auto"></div>
                  </div>
                )}
              </div>
              <div
                onClick={() => setSelectedPlatform("whatsapp-premium")}
                className={`cursor-pointer border rounded-lg p-6 text-center transition-all ${
                  selectedPlatform === "whatsapp-premium"
                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 shadow-md"
                    : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center relative">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                  </svg>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-yellow-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-lg font-semibold ${
                    selectedPlatform === "whatsapp-premium"
                      ? "text-yellow-700"
                      : "text-gray-900"
                  }`}
                >
                  WhatsApp Premium
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    selectedPlatform === "whatsapp-premium"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  Whitelist Account
                </p>
                {selectedPlatform === "whatsapp-premium" && (
                  <div className="mt-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto"></div>
                  </div>
                )}
              </div>
              <div
                onClick={() => setSelectedPlatform("messenger")}
                className={`cursor-pointer border rounded-lg p-6 text-center transition-all ${
                  selectedPlatform === "messenger"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                    : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 3.54 1.84 6.64 4.61 8.39V24l3.65-2.01C11.48 21.99 11.74 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1.13 13.83l-2.61-2.79-5.09 2.79L10.52 10l2.61 2.79L18.22 10l-5.09 5.83z" />
                  </svg>
                </div>
                <h3
                  className={`text-lg font-semibold ${
                    selectedPlatform === "messenger"
                      ? "text-blue-700"
                      : "text-gray-900"
                  }`}
                >
                  Messenger
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    selectedPlatform === "messenger"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  Facebook Messenger integration
                </p>
                {selectedPlatform === "messenger" && (
                  <div className="mt-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              onClick={handleClose}
              variant="outline"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConnect}
              disabled={!selectedPlatform || isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </div>
              ) : (
                "Connect Platform"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddItemsCard;
