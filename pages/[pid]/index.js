import path from "path";
import process from "process";
import fs from "fs/promises";

function ProductDetailPage(props) {
  const { fetchedProduct } = props;

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

    fallback: "blocking",
  };
}

export default ProductDetailPage;
