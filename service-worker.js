self.addEventListener('fetch', function(event) {
    event.respondWith(caches.open('cache').then(function(cache) {
        return cache.match(event.request).then(function(response) {
            console.log("cache request: " + event.request.url);
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
                console.log("fetch completed: " + event.request.url, networkResponse);
                if (networkResponse) {
                    console.debug("updated cached page: " + event.request.url, networkResponse);
                    if (event.request.method === 'GET' && networkResponse.type === 'basic') {
                        cache.put(event.request, networkResponse.clone());
                    }
                }
                return networkResponse;
            }, function(event) {
                console.log("Error in fetch()", event);
                event.waitUntil(
                    caches.open('cache').then(function(cache) {
                        return cache.addAll([
                            '/',
                            '/index.html',
                            '/index.html?homescreen=1',
                            '/?homescreen=1',
                            '/css/africa.svg',
                            '/css/africa2.svg',
                            '/css/animate.css',
                            '/css/bootstrap.min.css',
                            '/css/owl.carousel.min.css',
                            '/css/responsive.css',
                            '/css/styles.css',
                            '/images/assets/events/kotlin.jpg',
                            '/images/assets/team/jeremiah_polo.jpg',
                            '/images/assets/team/nganga_victor.jpg',
                            '/images/assets/team/ike_mawira1.jpg',
                            '/images/assets/team/grace.png',
                            '/images/assets/team/james.png',
                            '/images/assets/team/ivy_.png',
                            '/images/assets/team/arnold.png',
                            '/images/assets/team/avatar.png',

                            '/images/assets/diversity.png',
                            '/images/assets/logo2.png',
                            '/images/assets/technologies/android.png',
                            '/images/assets/technologies/cloud.png',
                            '/images/assets/technologies/mi.png',
                            '/images/assets/technologies/web.png',
                            '/images/favicon.png',
                            '/images/icon.png',
                            '/js/custom.js',
                            '/js/vendors/bootstrap.bundle.min.js',
                            '/js/vendors/jquery.easing.min.js',
                            '/js/vendors/jquery.magnific-popup.min.js',
                            '/js/vendors/jquery.min.js',
                            '/js/vendors/owl.carousel.min.js',
                            '/js/vendors/swiper.min.js',
                            '/js/wow.min.js',
                            'https://cdn.svgporn.com/logos/algolia.svg',
                            'https://cdn.svgporn.com/logos/google.svg',
                            'https://cdn.svgporn.com/logos/microsoft.svg',
                            '/service-worker.js',
                            '/manifest.json',
                        ]);
                    })
                );
            });
            return response || fetchPromise;
        });
    }));
});
self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log("Latest version installed!");
});