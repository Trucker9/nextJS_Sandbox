
// These imports will only be used in server side code and won't be present at client side code.
import fs from 'fs/promises';
import path from 'path';
import process from "process";


function HomePage(props) {
    const {products} = props;
  return (
    <ul>
        {products.map(prd => <li key={prd.id}>{prd.title}</li>)}
    </ul>
  );
}

// Only in page files
// Has to be called like this
// Has to always return an object with a props key with a value of an object.
// next.js first executes this function and then executes the page in order to get the data needed for the props.

// Code below won't be sent to the client. It will be executed ON THE SERVER SIDE.

export async function getStaticProps() {

  // process.cwd() --> Returns Current Working Directory. but in vanilla JS
  // Here we are using next, and later this code will be executed from 'root' directory. it's just how next.js works.
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products
    },
    // Watch line 43
    revalidate: 10
  };
}

export default HomePage;

// The approach used here is ok until we find out that updating every page needs a new build and deployment.
// Page files will be transformed into HTML files while building.
// There is 2 methods in order to face changes
// 1. Fetch dynamic data with react in client side (some pre-rendered data + updating data in client side)
// 2. Tell next.js to kind of rebuild the pages every X seconds and update data with that. (IN DEV MODE, ALWAYS WILL REGENERATE)

