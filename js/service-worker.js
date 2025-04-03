const CACHE_NAME = 'game-cache-v1'; // Pakeisk su savo versija
const urlsToCache = [
    '/', // Pagrindinis puslapis
    '/index.html', // Priklauso nuo tavo puslapio struktūros
    '/style.css',
    '/script.js',
    '/assets/logo.png', // Būtinai pridėk visus savo resursus (nuotraukas, fontus ir pan.)
    '/Gamas/icon-192.png',
    '/Gamas/icon-512.png',
    // Jei naudojate Firebase, galbūt norėsi pridėti ir jo SDK
];

// Įkėlimo metu (install event) talpiname visus resursus į naršyklės cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Žinučių atnaujinimas (cache ir background sync)
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME]; // Tai yra leidžiami cache pavadinimai
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName); // Išvalyti senus cache
                    }
                })
            );
        })
    );
});

// Fetch įvykis – kaip pasiekti resursus offline režimu
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Jei resursas yra cache, grąžinama jį
                return cachedResponse;
            }
            // Jei resursas nėra cache, atliekame paprastą užklausą
            return fetch(event.request);
        })
    );
});
