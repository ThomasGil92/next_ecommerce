import Layout from "../../components/Layout";
import Navbar from "../../components/admin/Navbar";
import AddCategoriesForm from "../../components/categories/AddCategoriesForm";

const AddCategorie = () => {
  return (
    <Layout>
      <Navbar />
      <AddCategoriesForm />
    </Layout>
  );
};
export default AddCategorie;
