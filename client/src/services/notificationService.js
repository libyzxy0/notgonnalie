export function showNotification(msg) {
  try {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.showNotification('New Message!', {
            body: 'Click to view message!',
            icon: '/icons/icon.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: 'vibration-sample',
            actions: [
              {
                action: 'explore',
                title: 'Click Me Senpai',
                icon: 'icons/icon.png'
              }
            ]
          })
        })
        .catch((err) => alert('Service Worker registration error: ' + err))
    }
  } catch (err) {
    alert('Notification API error: ' + err)
  }
}

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  if (event.action === 'explore') {
    clients.openWindow('https://example.com')
  }
})
