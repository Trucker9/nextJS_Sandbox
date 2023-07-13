import path from "path";
import process from "process";
import fs from "fs/promises";

function ProductDetailPage(props) {
  const { fetchedProduct } = props;

    // Because fallback is true, we add this loading page for the time that
    // the actual page is being rendered. after the render finishes, the actual
    // page will be loaded for the user.
    if (!fetchedProduct) return  <p>Loading</p>

  return (
    <>
      <h1>{fetchedProduct.title}</h1>
      <p>{fetchedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const product = data.products.find((pr) => productId === pr.id);
  // If failed to find a product for an id do not return the page with missing
  // data. instead return 404
  if (!product){
    return {notFound: true}
  }

  return {
    props: {
      fetchedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = getData();
  const ids = data.products.map((el) => {
    el.id;
  });
  const extractedPaths = ids.map((el) => ({ params: { pid: el } }));
  return {
    paths: [extractedPaths],

    // By setting this to true, the page will be loaded for any entered "pid"
    // which may not be in the data we fetch and causes error.
    fallback: true,
  };
}

export default ProductDetailPage;
