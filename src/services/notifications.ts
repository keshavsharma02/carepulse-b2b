export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
    } catch {
      // SW registration failure is non-blocking for app usage.
    }
  }
};

export const triggerLocalNotification = async () => {
  if (!('Notification' in window)) {
    return;
  }

  if (Notification.permission === 'default') {
    await Notification.requestPermission();
  }

  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification('CarePulse Alert', {
        body: 'ICU bed availability dropped below threshold.',
        icon: '/vite.svg',
        tag: 'carepulse-critical-alert',
      });
    });
  }
};
