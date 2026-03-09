const page = () => {
  return (
    <div className="flex h-dvh items-center justify-center uppercase">
      <button
        onClick={() => {
          if (Notification.permission === "granted") {
            new Notification("🚨 New Incident", { body: "Check your dashboard!", icon: "/logo.png" });
            const audio = new Audio("/sounds/bell-2.mp3");
            audio.play().catch(() => console.log("Audio blocked"));
          }
        }}
      >
        Test Notification
      </button>
    </div>
  );
};

export default page;
