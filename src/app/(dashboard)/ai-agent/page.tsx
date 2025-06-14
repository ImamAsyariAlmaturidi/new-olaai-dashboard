"use client";
import CardIconOne from "@/components/cards/card-with-icon/CardIconOne";
import AiAgentCard from "@/components/common/AiAgentCard";
import ComponentCard from "@/components/common/ComponentCard";
import React from "react";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import ModalBasedAlerts from "@/components/example/ModalExample/ModalBasedAlerts";
import FormInModal from "@/components/example/ModalExample/FormInModal";

const page = () => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div>
      <AiAgentCard
        title="AI Agent"
        desc="Manage your AI agents and their configurations."
      >
        <div onClick={openModal} className="cursor-pointer">
          <CardIconOne />
        </div>
      </AiAgentCard>

      {isOpen && (
        <>
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[900px] p-5 lg:p-10"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
                Connect New Platform
              </h4>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default page;
