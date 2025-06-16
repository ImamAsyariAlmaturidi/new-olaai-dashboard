"use client";
import AiAgentCard from "@/components/common/AiAgentCard";
// import ComponentCard from "@/components/common/ComponentCard";
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { Card, CardContent } from "@/components/cards/card-only/card";
import { Plus, Settings, Trash2 } from "lucide-react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import Link from "next/link";

export interface Agent {
  id: string;
  name: string;
  template: string;
  description: string;
  avatar: string;
}

const Page = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [agents] = useState<Agent[]>([
    {
      id: "1",
      name: "HRD",
      template: "Customer Service AI",
      description: "AI agent untuk customer service",
      avatar: "HR",
    },
  ]);

  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
      <AiAgentCard
        title="AI Agent"
        desc={`Ini adalah halaman di mana Anda dapat mengunjungi AI yang telah Anda buat sebelumnya.\nJangan ragu untuk membuat perubahan dan membuat chatbot sebanyak yang Anda inginkan\nkapan saja!`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-6 justify-center flex-wrap">
            {/* Create New Card */}
            <Card
              className="w-64 bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all duration-200 border-0"
              onClick={openModal}
            >
              <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Plus className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg">Create New</h3>
              </CardContent>
            </Card>
            <Card className="w-64 border-0 ">
              <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                <h3 className="mt-1 font-semibold text-lg mb-4 text-slate-900 dark:text-white text-center">
                  {agents[0].name}
                </h3>
                <div className="flex gap-2 justify-center">
                  <Link href="/ai-agent/setting">
                    <Button variant="outline" size="sm" className="shadow-sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Settings
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 dark:text-red-400 hover:dark:text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 shadow-sm"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AiAgentCard>

      {isOpen && (
        <>
          <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[900px] p-5 lg:p-10">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
                AI Agent Name
              </h4>
              <div className="space-y-6">
                <ComponentCard title="Create New">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="test">Input</Label>
                      <Input type="text" id="test" />
                    </div>
                    <div>
                      <Label>Select Input</Label>
                      <Select
                        options={options}
                        placeholder="Select an option"
                        onChange={handleSelectChange}
                        className="dark:bg-dark-900"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button>Create AI Agent</Button>
                    </div>
                  </div>
                </ComponentCard>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Page;
