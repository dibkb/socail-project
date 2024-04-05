"use client";
import { getAllUserNotifications } from "@/actions/getComment";
import { Globallayout } from "@/components/layouts/main";
import React from "react";
import useSWR, { SWRResponse } from "swr";
import { Notification } from "@/types";
import Notificationbody from "@/components/notifications/notification-body";
import { useIsMounted } from "@/hooks/isMounted";
import { redirect } from "next/navigation";
import { useUserStore } from "@/src/providers/user-store-provider";
export default function Activity() {
  const { user } = useUserStore((state) => state);
  const { data, error, isLoading }: SWRResponse<Notification[]> = useSWR(
    "user-notifications",
    getAllUserNotifications
  );
  const notificationBody = data?.map((u) => (
    <Notificationbody key={u.id} data={u}></Notificationbody>
  ));
  const isMounted = useIsMounted();
  if (!user && isMounted) return redirect("/auth/login");
  return (
    <Globallayout>
      <div className="gap-2 flex flex-col">{notificationBody}</div>
    </Globallayout>
  );
}
