export const playNotificationSound = () => {
  try {
    const audio = new Audio("/sounds/notification.mp3");
    audio.volume = 0.5;
    audio.play().catch(err => {
      console.warn("Audio playback blocked by browser/user interaction:", err);
    });
  } catch (error) {
    console.error("Error playing notification sound:", error);
  }
};
