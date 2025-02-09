"use client";

import Modal from "@/components/home/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/hooks/use-user";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function HomeView() {
  const t = useTranslations("HOME");
  const [open, setOpen] = useState(false);
  const { data, isLoading, error, refetch } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userData = data?.success ? data.data : null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="mx-auto p-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-medium font-lato leading-8">
          {t("TITLE")}
        </h2>
        <Button
          onClick={() => setOpen(true)}
          className="font-semibold text-[22px] leading-8 bg-[#15D2AD] hover:bg-emerald-500 text-white rounded-full px-6 py-3"
        >
          {userData ? t("UPDATE") : t("ADD")}
        </Button>
      </Card>
      <Modal
        open={open}
        onOpenChange={setOpen}
        initialData={userData}
        refetch={refetch}
      />
    </div>
  );
}
