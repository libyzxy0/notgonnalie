export function showNotification(msg) {
   if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification("New Message!", {
            body: msg,
            icon: "/icons/icon.png",
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "vibration-sample",
          });
        });
      }
}