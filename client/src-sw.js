// TODO: Create a service worker that caches static assets:
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate} from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';


precacheAndRoute(self.__WB_MANIFEST);

// Register route for caching dynamic CSS and JS files.
// i.e. bootstrap, jQuery, ...
// The StaleWhileRevalidate strategy serves content from cache AND loads it from source if needed.
registerRoute(
  ({ request }) => {
    console.log(request);
    return (
      // CSS
      request.destination === 'style' ||
      // JavaScript
      request.destination === 'script'
    );
  },
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);