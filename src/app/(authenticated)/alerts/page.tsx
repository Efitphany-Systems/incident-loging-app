"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    setPermission(Notification.permission);

    // Register Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch((err) => console.error("SW registration failed:", err));
    }
  }, []);

  const handleNotification = async () => {
    setError(null);

    try {
      let currentPermission = Notification.permission;

      // Request permission if needed
      if (currentPermission === "default") {
        currentPermission = await Notification.requestPermission();
        setPermission(currentPermission);
      }

      if (currentPermission !== "granted") {
        setError("Notification permission not granted!");
        return;
      }

      // Wait for service worker to be ready
      const registration = await navigator.serviceWorker.ready;

      await registration.showNotification("🚨 New Incident", {
        body: "Check your dashboard!",
        icon: "/logo.png",
        tag: "incident-notification",
      });

      // Play notification sound
      const audio = new Audio("/sounds/bell-2.mp3");
      audio.currentTime = 0;
      await audio.play().catch(() => {
        console.log("Audio blocked by browser");
      });
    } catch (err: any) {
      setError(err?.message || "Something went wrong while showing notification.");
    }
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 uppercase">
      <button onClick={handleNotification} className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
        Test Notification
      </button>

      <div>Permission: {permission}</div>

      {error && <div className="mt-2 rounded bg-red-100 px-4 py-2 text-red-700">{error}</div>}
    </div>
  );
};

export default Page;
