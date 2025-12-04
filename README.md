## Create and run mock server

-created a folder name server and go to the server by cd .\server\ and run "npm install json-server" from the https:www.npmjs.com/package/json-server
-created a db.json file and paste the data from the doc
-to run the sever "npx json-server db.json -p 8000"

### ⭐ 1. SSR – Server-Side Rendering

HTML is generated on every request.
<br>
Always fetches fresh data.
<br>
Use when:
<br>
✔ Live data (dashboard, admin panel, real-time prices)
<br>
✔ User-specific data (auth-based content)

Example (Next.js App Router)
<br>
export const dynamic = "force-dynamic"; enable SSR
<br>
export default async function Page() {
<br>
const res = await fetch("https:api.example.com/users", {
<br>
cache: "no-store", no caching
<br>
});
<br>
const data = await res.json();
<br>
return <div>{JSON.stringify(data)}</div>;
}

What happens?
<br>
i. User visits page → server fetches data → sends fresh HTML
<br>
ii. Happens every time
<br>
Use case:
<br>
i. Best for real time or dynamic content i.e user dashboard
<br>
Limitation:
<br>
i. Low performance
<br>
Flow: request => server => data fetch => render html in server => then render html in browser
<br>
Note: as two types of rendering that's why performance is slow.

### ⭐ 2. SSG – Static Site Generation

HTML is generated once during build time.
<br>
Fastest performance.
<br>
Use when:
<br>
✔ Data that doesn’t change often
<br>
✔ Blogs, documentation, landing pages
<br>

Example
<br>
export const dynamic = "force-static"; default behavior
<br>

export default async function Page() {<br>
const res = await fetch("https:api.example.com/posts");
<br>
const data = await res.json();<br>

return <div>{JSON.stringify(data)}</div>;
}

What happens?<br>
i. HTML generated at build time (npm run build)<br>
ii. Served instantly from CDN<br>
iii. Does not fetch new data unless rebuild<br>

Limitation:<br>
i. frequently changed dynamic data cannot be handled properly
<br>
Flow: request => hits CDN(Content Delivery Network) => pre-render the html => send to browser

### ⭐3. ISR – Incremental Static Regeneration also known as Hybrid Rendering (Combination of SSG and SSR)

Static page that updates automatically after an interval.<br>
You get performance of SSG but with auto refresh.<br>

Use when:<br>
✔ Blogs updated sometimes<br>
✔ E-commerce products<br>
✔ News articles<br>

Example<br>
export const revalidate = 60; rebuild page every 60 seconds<br>

export default async function Page() {<br>
const res = await fetch("https:api.example.com/news");<br>
const data = await res.json();

return <div>{JSON.stringify(data)}</div>;
}

Flow:
request => CDN => (Old Html) if doesn't exist any data then go to another request following
|
|  
|==> go to data source => background rebuild after x seconds => then replace old CDN HTML (Old Html)

What happens?<br>
i. Page is static initially<br>
ii. After x seconds, the next visitor triggers background regeneration<br>
iii. Updated page is shown to everyone<br>

### ⭐ 4. CSR – Client Side Rendering

-Page loads with minimal or empty html.<br>
-All data fetching and rendering is performed inside the browser with javascript<br>
-the UI is build after page loads, Using react on the client side<br>

When to use:<br>
-When u need browser specific features like hooks, local stat, document/window<br>
-When SEO is not important<br>
-Data must be fetched after page loads. e.g user-specific data, dashboard<br>

**Note:** To enable CSR in the App router you must you write "use-client"

Performance:<br>
i. First load is slow<br>
ii. update is fast<br>

Best for: Dashboard, chat apps, Analytics
<br>
Flow: Request => Fetch Data => parse backend data => Render in browser

### What is the normal webpage rendering process of webpage in client and server (LWS)?

Ans: url is hit => request go to server => server fetch data from database and creates webpage => in response server sends the html, css and useful javascript in browser (Note: Javascript is not rendered in server, it renders in browser to make the page interactive. The process of page interactive when javascript renders in browser is called Hydration)

### What is the react and nextjs rendering process (LWS)?

Ans: url is hit => request go to server => server fetch data from database => in server generates react tree which contains both server component (e.g. show data, creates html, css) and client component (e.g. Button) => Nextjs renders server component in server i.e creates html and sends to the browser and to generate the react tree in the browser nextjs sends a file which creates a react tree without using react or next.js which is called RSC Payload (it's a kind of a log book which contains process of how nextjs generates the component in server). So in the browser there is no use of react or next.js library and on the other hand server also sends the client component as an empty box to the browser with essential js, also sends react or next.js library to convert the jsx to html in browser.

What is RSC - React Server Component?
Flow: server fetches the data => serializable payload (i.e data is send as chunk) => in client side minimum js is loaded which increase the performance

B. Next js caching flow?
=> Next.js improves your application's performance and reduces costs (cost is depends on per request call so to reduce the cost by using caching) by caching rendering work and data requests.

### 3W 3H Framework briefly (LWS)

Ans:

<ol>
<li>What is the caching strategy</li>
<li>Where is cache stored</li>
<li>Why caching or whats's the benefit of this strategy</li>
<li>How long (duration) cache is valid</li>
<li>How to refresh (revalidation) cache</li>
<li>How to ignore or opt out (invalid) of the caching strategy</li>
</ol>

### Caching strategy (LWS) or Answer of the 3W 3H Framework question

<ol>
<li>যদি client side থেকে কোন route এ hit করে তখন নিজেকে প্রশ্ন করে আমি কি server এ যাব নাকি browser মধ্যে তা save করা আছে (যদি আমি আগে কখনও visit করে থাকি) এই question টা করে first এ router এর <strong>Router cache এ</strong> which present in client side.</li>
<li>If the step 1 is false, then it goes to server then server will render the react tree and raise the question should i render the react tree which is asked in <strong> Full Route cache </strong>. If any one render the react tree previously on request by other user or render it in a build time so no need to render it.  Here nextjs cached the previously rerendered page in <strong> Full Route cache </strong>, if any one hit the route it sends the rerendered page (previously generated page from Full Route cache) </li>
<li>If the step 2 is false i.e it needs to render the page as the page contains multiple component where some of the component needs the multiple data fetching by fetch request or db fetching. It will ask the question to <strong> Request Memoization  </strong> about the only data fetching request output is cached in Request Memoization or need to fetch from the source?</li>
<li>If the step 3 is false i.e it needs to fetch from the db or other source for network request. Before the network request it ask the another question that should i called network request or is cached in <strong> Data Cache </strong> in server for data fetching request output.  </li>
<li>If the step 4 is false then it hits the api for data fetching from db or other sources. When it response the data from the source it will save the data in the  <strong> Data Cache </strong> for the next user.</li>
</ol>

### Normal caching strategy

<p align="center">
  <img src="/public/img/next-js-caching-strategies.jpg" width="800" />
</p>

### Elaborate caching strategy

<p align="center">
  <img src="/public/img/next-js-caching-strategies-2.png" width="800" />
</p>

### Request Memoization

1.0 first create common api and added duration to calculate the time during build time

2.0 To understand request memoization in Next.js we create RequestMemoization component and fetch data using common api

2.1 also created TotalPrice component and fetch data using common api

2.2 also created ProductCount component and fetch data using common api

2.3 also created generateMetadata component and fetch data using common api

2.4 all the component level data fetching is same. Now we run the npm run build and if we go to see the terminal there are 4 same type of network request for data fetching ([generateMetadata()], [Page], [ProductCount], [TotalPrice]). During build time the [generateMetadata()] and [Page] level data fetching network request took longer time but the [TotalPrice] and [ProductCount] level data fetching network request took less time. Why? Because according to 3W 3H rule first it ask the question should i need to data fetch. For the answer of this question, in the build time it cache the [generateMetadata()] and [Page] level data fetching network request that's why it took longer time. But in the build time [TotalPrice] and [ProductCount] level data fetching took less time because it took the fetched data from the Request Memoization cache during build time of [generateMetadata()] and [Page] level data fetching. Next js same network request is not called every time that's why it's called request deduplication. The advantage of request deduplication is that it save the network request and we also don't need to props drilling i.e if we have nested component then we don't need to pass the data from parent to child component. On the other hand we can call network request every time.

2.5.0 Check request Memoization for dynamic pages. as the page is static the request memoization is also worked for dynamic (SSR) pages. By default nextjs cache is "force-cache" but if we use "no-store" then it will also cache the request for the dynamic pages.

2.5.1 Check request Memoization for dynamic pages.

2.5.2 Check request Memoization for dynamic pages.

2.5.3 Check request Memoization for dynamic pages.

2.5.4 now run build and u will see the "ƒ /request-memoization" in the terminal which means it is dynamic. Now we go to the Request Memoization then see in the vs code terminal we will see [generateMetadata()] and [Page] level data fetching network request took longer time but the [TotalPrice] and [ProductCount] level data fetching network request took less time for request memoization. Request memoization also works for dynamic pages. But this type of cache is temporary as if we use "no-store". Now if we go to another route and return to the Request Memoization Route we will see only [generateMetadata()] and [Page] level network request for every time route changes due to temporary cache but less network latency for [TotalPrice] and [ProductCount] as it memorize the request. But if we comment the "no-store" i.e is make it "force-cache" and change the data from the db.json it will show the stale data.
Note: In request memoization data is not cached, only the promise is cached in Request Memoization. This is the promise which will get the during same network request call for the [TotalPrice] and [ProductCount]. Request memoization works in react tree only - generateMetadata, generateStaticPrams, layout.js, page.js, etc. But other server components like route handlers or api routes, request memoization doesn't work. It will also not works in next js middleware. Because they are the outside of react tree. Also next.js fetch caching feature is also not worked in middleware of next.js.

**How Request Memoization Works**

<p align="center">
  <img src="/public/img/request-memoization.avif" width="800" />
</p>

-While rendering a route, the first time a particular request is called, its result will not be in memory and it'll be a cache MISS.
-Therefore, the function will be executed, and the data will be fetched from the external source, and the result will be stored in memory.
-Subsequent function calls of the request in the same render pass will be a cache HIT, and the data will be returned from memory without executing the function.
-Once the route has been rendered and the rendering pass is complete, memory is "reset" and all request memoization entries are cleared.

### Data Cache

3.0 also created DataCache component and fetch data using common api fetch is used in a tag. As we know in nextjs we can give tag for fetch request. Data cache is ask question, as i have to perform request call before that the data is saved in cache or i will perform network request? Now run npm run build. Then go to the db.json and change any data now go to the data-cache page and reload u will not get the updated data. Because the data is cached in build time and showing the data from the cache i.e stale data.

**How the Data Cache Works**

<p align="center">
  <img src="/public/img/data-cache.png" width="800" />
</p>

-The first time a fetch request with the 'force-cache' option is called during rendering, Next.js checks the Data Cache for a cached response.
-If a cached response is found, it's returned immediately and memoized.
-If a cached response is not found, the request is made to the data source, the result is stored in the Data Cache, and memoized.
-For uncached data (e.g. no cache option defined or using { cache: 'no-store' }), the result is always fetched from the data source, and memoized.
-Whether the data is cached or uncached, the requests are always memoized to avoid making duplicate requests for the same data during a React render pass.

3.1 Data cache is revalidate in 2 ways.
i. Time based revalidation
ii. on demand revalidation

3.2.0 Time based revalidation:
As the data cache is saved in build time and cannot get the updated data we use time based revalidation i.e data will be revalidated on the basis of time.

3.2.1 Time based revalidation route created then run build command. Now if u hit to that route it will go the time based revalidation page. now change the data in db.json and reload, u will not see the updated data at once but after 30 seconds u will see the updated data.

**How Time-based Revalidation Works**

<p align="center">
  <img src="/public/img/time-based-revalidation.png" width="800" />
</p>

-The first time a fetch request with revalidate is called, the data will be fetched from the external data source and stored in the Data Cache.
-Any requests that are called within the specified timeframe (e.g. 60-seconds) will return the cached data.
-After the timeframe, the next request will still return the cached (now stale) data.
=>Next.js will trigger a revalidation of the data in the background.
=>Once the data is fetched successfully, Next.js will update the Data Cache with the fresh data.
=>If the background revalidation fails, the previous data will be kept unaltered.

3.3.0 On demand revalidation:
As the data cache is saved in build time and cannot get the updated data we use also on demand revalidation i.e data will be revalidated on the basis of revalidate tag or path which is based on server action.

3.3.1 On demand revalidation using revalidatePath i.e revalidate only the path. so create a server action using onRevalidatePath function.

3.3.2 call the onRevalidatePath function. Now build command run and hit to the On Revalidate Path button, u will see the updated data on clicking the button.

<p align="center">
  No Picture
</p>
3.3.3 On demand revalidate using revalidate tag i.e revalidate by tag. so create a server action using onRevalidateTag function.

3.3.4 call the onRevalidateTag function. Now build command run and hit to the On Revalidate Tag button, u will see the updated data on clicking the button. i.s keeping the page static we will update the data dynamically that's the power of Next.js

**How On-Demand Revalidation Works**

<p align="center">
  <img src="/public/img/on-demand-revalidation.png" width="800" />
</p>

-The first time a fetch request is called, the data will be fetched from the external data source and stored in the Data Cache.
-When an on-demand revalidation is triggered, the appropriate cache entries will be purged from the cache.
=>This is different from time-based revalidation, which keeps the stale data in the cache until the fresh data is fetched.
-The next time a request is made, it will be a cache MISS again, and the data will be fetched from the external data source and stored in the Data Cache.

### Data cache for dynamic page

3.4.0 We can also use data cache for dynamic page

3.4.1 we will fetch the data using common api and used tag for revalidation and use force cache to for save the data because as it is a dynamic page it will automatically fetch the data by network request. now run npm run build and change data of other Products from the db.json file and reload u will not get the updated data in the other products section. Because the data is cached in build time and showing the data from the cache as being dynamic page. if u select the updated product will get the selected product's updated data.

3.4.2 also fetch data using common api for dynamic value

3.4.3 u can revalidate it using revalidateTag

3.4.4 call the onRevalidateTag function. now run build and u can revalidate by the tag. we can use Data Cache in dynamic page, static page. On demand revalidate i.e time based revalidation, tag base revalidation.

**Points to remember for data cache**

<p align="center">
  <img src="/public/img/points-to-remember-data-cache.png" width="800" />
</p>

## Full Route Cache

**What is React Server Component Payload (RSC Payload)?**

Ans: When a server component renders in server, nextjs logs the process how it renders in the server and in client side it renders or generate the react tree using the log which is called RSC Payload without nextjs and react library.

-As we know, Full Route cache render the react tree and raise the question should i render the react tree which is asked in <strong> Full Route cache </strong>. If any one render the react tree previously on request by other user or render it in a build time so no need to render it. That's why Full Route Cache works only in statically build page.

4.0 Created a FullRouteCache component and fetch data using common api now run npm run build. Open the network tab u will see the full-route-cache. Now select the full-route-cache then select the preview u will see the log file i.e RSC Payload. Using this log react tree is generated in client side. Full Route cache ask the question should i render it or not. To render it Full Route cache needs RSC Payload and also build time generated html. In build time nextjs cache the RSC Payload and html in Full Route Cache in server. When user come and click the route and comes the RSC Payload and user see the page without render.

4.1 To revalidate the data we use revalidateTag or revalidatePath function.

4.2.0 If we want to avoid this page full route cache in build time we have to make the page dynamic [] or using following server side feature. After making the site dynamic now if you go to the full-route-cache page and open network tab u will find empty RSC Payload that means it's dynamic.

4.2.1 also using cache: "no-store" to make the page dynamic in getData function.

4.2.2 using { next: { revalidate: 0 } } to make the page dynamic in getData function

4.2.3 also use "force-dynamic" to make the page dynamic

**How Full Route Cache Works**

For Static:

<p align="center">
  <img src="/public/img/full-route-cache-static.jpg" width="800" />
</p>

For Dynamic:

<p align="center">
  <img src="/public/img/full-route-cache-dynamic.jpg" width="800" />
</p>

## Router Cache

- As we know when a user hits a url first browser ask the question should i go to the server or the cache is saved in Router cache in client side.
