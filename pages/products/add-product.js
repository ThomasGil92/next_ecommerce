import Layout from "../../components/Layout";
import NavBar from "../../components/admin/Navbar";
import AddProductForm from "../../components/products/AddProductForm";
import { useEffect } from "react";
import { useRouter } from "next/router";

const AddProduct = ({ categories }) => {
  const router = useRouter();

  useEffect(() => {
    if (process.browser) {
      if (!sessionStorage.getItem("admin")) {
        router.push("/login-admin");
      }
    }
  });

  return (
    <Layout>
      <NavBar />
      <AddProductForm categories={categories} />
    </Layout>
  );
};
export async function getServerSideProps(context) {
  const categoriesUrl = await fetch(
    `${process.env.REST_API}/api/categories/get`,
  );
  const categories = await categoriesUrl.json();

  return { props: { categories } };
}
export default AddProduct;
