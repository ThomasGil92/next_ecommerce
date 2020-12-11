import Layout from "../../components/Layout";
import NavBar from "../../components/admin/Navbar";
import AddProductForm from "../../components/products/AddProductForm";
import { useEffect } from "react";
import { useRouter } from "next/router";

const AddProduct = ({ categories }) => {
  const router = useRouter();
  /* useEffect(() => {
    if (!sessionStorage.getItem("admin") || !sessionStorage.getItem("master")) {
      router.push("/login");
    }
  }); */

  return (
    <Layout>
      <NavBar />
      <AddProductForm categories={categories} />
    </Layout>
  );
};
export async function getServerSideProps(context) {
  const categoriesUrl = await fetch("http://localhost:3000/api/categorie/get");
  const categories = await categoriesUrl.json();

  return { props: { categories } };
}
export default AddProduct;
