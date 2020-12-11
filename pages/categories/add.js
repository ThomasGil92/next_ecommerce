import Layout from "../../components/Layout";
import NavBar from "../../components/admin/NavBar";
import AddCategoriesForm from "../../components/categories/AddCategoriesForm";

const AddCategorie = () => {
  return (
    <Layout>
      <NavBar />
      <AddCategoriesForm />
    </Layout>
  );
};
export default AddCategorie;
