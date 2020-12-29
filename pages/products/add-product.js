import Layout from "../../components/Layout";
import NavBar from "../../components/admin/Navbar";
import AddProductForm from "../../components/products/AddProductForm";

const AddProduct = ({ categories }) => {
 

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
