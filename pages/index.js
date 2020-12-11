import Layout from "../components/Layout";
import PublicNavBar from "../components/public/PublicNavbar";
import CategoriesSlider from "../components/public/CategoriesSlider";

export default function Home({ categories }) {
  return (
    <Layout>
      <PublicNavBar />
      <CategoriesSlider categories={categories} />
      {/* to attribute
      <a href='https://fr.freepik.com/photos/ecole'>École photo créé par freepik - fr.freepik.com</a>
      */}
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const categoriesUrl = await fetch("http://localhost:3000/api/categorie/get");
  const categories = await categoriesUrl.json();

  return { props: { categories } };
}
