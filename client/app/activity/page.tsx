"use client";
import { getAllUserNotifications } from "@/actions/getComment";
import { Globallayout } from "@/components/layouts/main";
import React from "react";
import useSWR, { SWRResponse } from "swr";
import { Notification } from "@/types";
import Notificationbody from "@/components/notifications/notification-body";
export default function Activity() {
  const { data, error, isLoading }: SWRResponse<Notification[]> = useSWR(
    "user-notifications",
    getAllUserNotifications
  );
  const notificationBody = data?.map((u) => (
    <Notificationbody key={u.id} data={u}></Notificationbody>
  ));
  return <Globallayout>{notificationBody}</Globallayout>;
}
