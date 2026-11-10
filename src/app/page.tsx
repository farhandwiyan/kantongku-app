import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kantongku",
  description: "Your personal app with AI",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Wallet className="text-primary size-22" />
      <h1 className="text-primary text-4xl font-bold">Welcome to Kantongku</h1>
      <p className="mt-2 text-lg">Your personal finance app with AI</p>
      <Link href="/dashboard">
        <Button className="mt-2" size="lg">
          Get Started
        </Button>
      </Link>
    </main>
  );
}
