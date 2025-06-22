"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const params = useParams();
  const chatbotId = params?.id as string;

  useEffect(() => {
    if (!chatbotId) {
      alert("No parameters found");
    } else {
      console.log(`Chatbot ID: ${chatbotId}`);
    }
  }, [chatbotId]);

  return <div>Chatbot ID: {chatbotId}</div>;
};

export default Page;
