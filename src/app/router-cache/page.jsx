import Link from "next/link";
import React from "react";

// 5.0 Created Router Cache component

export default function RouterCache() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Router Cache
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolorum
        facilis quidem, voluptatem necessitatibus, voluptate officia inventore
        asperiores tenetur esse pariatur consectetur neque rerum officiis
        obcaecati, itaque quam. Eligendi culpa numquam qui ab consectetur saepe
        inventore dicta! Dolorem nobis rem commodi sint iusto explicabo ratione
        repellendus ab quasi pariatur quisquam expedita eaque ipsa neque quia,
        error laudantium aut. Provident doloremque tenetur aliquam. Sequi
        similique ipsam omnis aperiam ad praesentium, hic aspernatur. Esse neque
        mollitia accusamus repellat, adipisci alias quo ut quasi qui fugit quas
        quisquam quod nisi vitae magni deserunt hic expedita, ratione nobis
        veniam veritatis ullam architecto! Maiores, molestiae.
      </p>
      <div className="flex flex-col gap-3">
        {/* 5.1 Created link for static and dynamic page */}

        {/* 5.4 Now go to network go to home page, hard reload the page then go to Router Cache page and see without clicking the Static Page and Dynamic Page it already fetched in the network request. Because in nextjs Link component prefetched the Link component due user can click it anytime. This is the nextjs default prefetching behavior.*/}
        {/* 5.5 If we don't want to prefetch the Link component we can control this behavior using prefetch={false} */}
        <Link
          href="/router-cache/static-page"
          className="w-full px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-center"
          // 5.5.1 apply prefetch={false}
          // prefetch={false}

          // 5.5.5 if u set prefetch={true} it will cache for static and dynamic page for 5 min. To check it go to network tab => go to home => hard reload => go to the router-cache page => initially both static and dynamic page will be prefetch. But when u click to go to the static and dynamic page it will not be prefetch, the both static and dynamic page will be cached in client side which is router cache.
          prefetch={true}
        >
          Static Page
        </Link>
        <Link
          href="/router-cache/dynamic-page"
          className="w-full px-6 py-3 border-2 border-gray-500 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
          // 5.5.3 Now build it and open network tab => go to home => hard reload => go to the router-cache page => prefetch stopped. Now if u go to the static page first time it will be prefetched in network request but second  time it will not be prefetched because it is cached in client side but the dynamic page will be prefetched in network request.

          // 5.5.2 apply prefetch={false}
          // prefetch={false}

          // 5.5.6 apply prefetch={true}
          prefetch={true}
        >
          Dynamic Page
        </Link>
        {/* 5.5.4 without prefetch in Link component i.e default Link component it will cache the static page for 5 min and for dynamic page will be 0 */}
      </div>

      {/* 5.5.7 there is another way to configure this prefetch router cache behavior using next.config.js. (in video length 1:24:10)*/}
    </div>
  );
}
