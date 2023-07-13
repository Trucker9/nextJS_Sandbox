import path from "path";
import process from "process";
import fs from "fs/promises";

function ProductDetailPage(props) {
  // React way
  // useEffect()

  const { fetchedProduct } = props;

  return (
    <>
      <h1>{fetchedProduct.title}</h1>
      <p>{fetchedProduct.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  // We need to access the URL query to get the desired product details:
  // NOTE: using useRouter will give us the params on the client side. we need it on the server side to fill up the page
  const { params } = context;
  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((pr) => productId === pr.id);

  return {
    props: {
      fetchedProduct: product,
    },
  };
}

// This page is dynamic. next.js can not pre render this page because the value
// of pid is not defined at the build time and is defined upon user requests.
// the "pid" value depends on the URL. we need to somehow tell next.js to
// prerender this page for what values.
export async function getStaticPaths() {
  return {
    paths: [
      // Pre render for p1, p2, p3
      { params: { pid: "p1" } },
    ],
    // Setting the fallback to blocking will tell next.js to if the entered value
    // for "pid" was not listed in the paths, generate the page with the "pid" value
    // upon user request. It takes some time btw.
    // We can list the frequently visited pages in the paths for better performance.
    // You can use  fallback: true to show a loading screen. watch 5-16
    fallback: 'blocking'
  };
}

export default ProductDetailPage;
