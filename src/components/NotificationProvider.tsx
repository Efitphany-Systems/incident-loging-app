"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/browser-client";
import { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";
import { useAuth } from "./AuthProvider";

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
  const user = useAuth();

  useEffect(() => {
    audioRef.current = new Audio("/sounds/bell-2.mp3");
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch((err) => console.error("Service Worker registration failed:", err));
    }
  }, []);

  const notify = async ({ title, body, icon }: NotifyPayload) => {
    if (Notification.permission !== "granted") return;

    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;

        await registration.showNotification(title, {
          body,
          icon,
        });
      } else {
        new Notification(title, { body, icon });
      }
    } catch (err) {
      console.error("Notification error:", err);
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        console.log("Audio blocked by browser");
      });
    }
  };

  useEffect(() => {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient();
    }

    const supabase = supabaseRef.current;

    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
    }

    subscriptionRef.current = supabase
      .channel("incidents-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "incidents",
        },
        (payload) => {
          if (payload.new?.created_by === user?.id) return;
          notify({
            title: "New Incident Reported",
            body: "A new incident has been reported. Please review it in the dashboard.",
            icon: "/logo.png",
          });
        }
      )
      .subscribe();

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, []);

  return <NotificationContext.Provider value={{ notify }}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);

  if (!ctx) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return ctx;
};
