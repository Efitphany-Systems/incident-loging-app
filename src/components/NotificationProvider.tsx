"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/browser-client";
import { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";
type NotifyPayload = {
  title: string;
  body?: string;
  icon?: string;
};

type NotificationContextType = {
  notify: (payload: NotifyPayload) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const supabaseRef = useRef<SupabaseClient | null>(null);
  const subscriptionRef = useRef<RealtimeChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/bell-2.mp3");
  }, []);

  const notify = ({ title, body, icon }: NotifyPayload) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body, icon });
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          console.log("Audio play failed (maybe browser autoplay restriction)");
        });
      }
    }
  };

  useEffect(() => {
    supabaseRef.current = createClient();
    if (subscriptionRef.current) {
      supabaseRef.current.removeChannel(subscriptionRef.current);
    }
    subscriptionRef.current = supabaseRef.current
      .channel("incidents-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "incidents" }, () => {
        if (Notification.permission === "granted") {
          notify({
            title: "🚨 New Incident",
            body: `A new notification is created look into it `,
            icon: "/logo.png",
          });
        }
      })
      .subscribe();
    return () => {
      if (subscriptionRef.current) {
        supabaseRef.current?.removeChannel(subscriptionRef.current);
      }
    };
  }, []);

  return <NotificationContext.Provider value={{ notify }}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used inside NotificationProvider");
  return ctx;
};
