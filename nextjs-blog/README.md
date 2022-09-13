
# getStaticProps notes:
1. for static generation with data, use getStaticProps
2. getStaticProps only runs on the server-side.
   It will never run on the client-side. It won’t even be included in the JS bundle for the browser.
   That means you can write code such as direct database queries without them being sent to browsers.

3. Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request
   time, such as query parameters or HTTP headers.

4. can only be exported from a page.

5. in development (npm run dev or yarn dev), getStaticProps will be called on every request. in production, getStaticProps will be called at build time.