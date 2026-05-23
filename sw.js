// SkyDot サービスワーカー (sw.js)

// インストールされたときの処理
self.addEventListener('install', (event) => {
    console.log('SkyDot Service Worker: インストール完了');
    self.skipWaiting();
});

// 有効化されたときの処理
self.addEventListener('activate', (event) => {
    console.log('SkyDot Service Worker: 有効化完了');
    return self.clients.claim();
});

// 将来的にサーバーからプッシュ通知（Push API）を受け取ったときの処理
self.addEventListener('push', (event) => {
    let data = { title: 'SkyDot', body: '新着メッセージがあります！' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/comment.svg',
        badge: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/comment.svg',
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});