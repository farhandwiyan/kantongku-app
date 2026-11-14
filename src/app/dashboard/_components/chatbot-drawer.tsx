"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { handleChat } from "@/features/transaction/ai/chat";
import { cn } from "@/lib/utils";
import { BotIcon, XIcon } from "lucide-react";
import { useState } from "react";
import ChatbotTextarea from "./chatbot-textarea";

export default function ChatBotDrawer() {
  const [conversation, setConversation] = useState<
    {
      role: string;
      parts: {
        text: string;
      }[];
    }[]
  >([
    {
      role: "user",
      parts: [
        {
          text: "Hello",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Hello, ow can i help you?",
        },
      ],
    },
  ]);

  return (
    <Drawer direction="right" modal={false}>
      <DrawerTrigger className="fixed buttom-4 right-4" asChild>
        <Button
          className="size-14 rounded-full"
          size="lg"
          variant="outline"
          // onClick={async () => {
          //   const result = await handleChat();
          //   console.log(result);
          // }}
        >
          <BotIcon className="size-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-screen! md:w-110!">
        <DrawerHeader className="flex flex-row justify-between">
          <div>
            <DrawerTitle className="semi-bold text-primary">
              AI Financial Advisor
            </DrawerTitle>
            <DrawerDescription>
              Get personilized financial advice.
            </DrawerDescription>
          </div>
          <DrawerClose asChild>
            <Button variant="outline" size="icon">
              <XIcon />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4 h-full">
          {conversation.length > 0 ? (
            <div className="flex flex-col h-full overflow-x-hidden no-scrollbar overflow-y-auto gap-8">
              {conversation.map((message, index) => (
                <div
                  key={`coversation-${index}`}
                  className={cn(
                    "flex flex-col gap-2",
                    message.role === "model" ? "items-start" : "items-end",
                  )}
                >
                  <div
                    className={cn("flex flex-col w-full", {
                      "bg-primary/20 text-primary px-5 py-2 rounded-3xl rounded-br-md w-fit max-w-3/4":
                        message.role === "user",
                    })}
                  >
                    {message.role === "model" && (
                      <p className="flex items-center gap-2 text-primary font-semibold text-xs">
                        <BotIcon />
                        AI Advisor
                      </p>
                    )}
                    {message.parts[0].text}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-3xl font-bold text-primary">Hello There</h2>
              <h4 className="text-xl">What can I help you?</h4>
            </div>
          )}
        </div>
        <DrawerFooter>
          <ChatbotTextarea />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
