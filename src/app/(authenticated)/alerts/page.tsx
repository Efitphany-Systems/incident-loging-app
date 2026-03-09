"use client";
import { useState } from "react";

const Page = () => {
  const [error, setError] = useState<string | null>(null);

  const handleNotification = async () => {
    setError(null); // reset error

    if (Notification.permission !== "granted") {
      setError("Notification permission not granted!");
      return;
    }

    try {
      new Notification("🚨 New Incident", {
        body: "Check your dashboard!",
        icon: "/logo.png",
      });

      const audio = new Audio("/sounds/bell-2.mp3");
      await audio.play();
    } catch (err: any) {
      setError(err.message || "Something went wrong while showing notification or playing sound.");
    }
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 uppercase">
      <button onClick={handleNotification} className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
        Test Notification
      </button>

      {error && <div className="mt-2 rounded bg-red-100 px-4 py-2 text-red-700">{error}</div>}
    </div>
  );
};

export default Page;
