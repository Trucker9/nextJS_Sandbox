# Notes

## Optimizing

### Configuring _head_ content

Using Head from next to change html head text.

``` javascript
import Head from 'next/head';

//...

      <Head>
        <title>Filtered Events</title>
        <meta
          name='description'
          content={`All events for ${numMonth}/${numYear}.`}
        />
      </Head>
      
```

### Reusing _head_

head html tags need to be available at each page. in next we return the actual page only
when we pass all the ```if``` checks. for example

```javascript
if (!error) {
}

if (data) {
}
```

but it is a good practice to save the head for each component or each page in a variable
and use it multiple times

```javascript
let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`A list of filtered events.`} />
    </Head>
  );

// ...

if (!loadedEvents) {
  return (
    <Fragment>
      {pageHeadData}
      <p className='center'>Loading...</p>
    </Fragment>
  );
}
```

#### Using _app.js - app wide settings!
This file runs for each and every page component by next.js.
we can add a head tag if we want to use it in all pages.

```javascript
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next Events</title>
        <meta name='description' content='NextJS Events'/>
        <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
```

### Overwriting _head_
next.js automatically merges head elements. If we use them in multiple child components
all will be merged and about conflicts:
1. _title_ tag will be overwritten by the latest tag.
2. _name_ attribute of the _meta_ tag will be overwritten by the latest one.

> This means we can define a general <head/> & <title/> tag on __app.js to ensure
> that we always have those tags but if we add them again in the components they will
> be overwritten!
---

###  _documents.js file
1. must be added at `/pages/_document.js`
2. It's the main wrapper html document. 
```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          {// Access to outside of main!
          }
          <div id='overlays' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

```

### Images


The image `<Image />` component of next.js:
1. optimizes images automatically.
   - Lazy loading
   - webp format
   - size
2. Creates and caches images on request
3. need a width and height as prop to shorten the file as needed. kinda ass :/
4. Read docs, has more loading features.
> You have to use Them.

## API route project notes
- Don't forget server side validation 

### Adding Database, MongoDB
- He used mongoDB package which is kina ass. so I didn't take note. But I think primsa is a package worth looking. works with next.js i think 

#### DB util file
- Separate db functions...
```javascript
// db-util.js
import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect("URL_HERE");

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();

  return documents;
}
```

#### Error handling example

```javascript
import { connectDatabase, insertDocument } from '../../helpers/db-util';
async function handler(req, res) {
   if (req.method === 'POST') {
      const userEmail = req.body.email;

      if (!userEmail || !userEmail.includes('@')) {
         res.status(422).json({ message: 'Invalid email address.' });
         return;
      }

      let client;

      try {
         client = await connectDatabase();
      } catch (error) {
         res.status(500).json({ message: 'Connecting to the database failed!' });
         return;
      }

      try {
         await insertDocument(client, 'newsletter', { email: userEmail });
         client.close();
      } catch (error) {
         res.status(500).json({ message: 'Inserting data failed!' });
         return;
      }

      res.status(201).json({ message: 'Signed up!' });
   }
}

export default handler;
```


























