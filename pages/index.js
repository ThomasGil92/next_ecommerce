import Layout from "../components/Layout";
import PublicNavbar from "../components/public/PublicNavbar.js";
import CategoriesSlider from "../components/public/CategoriesSlider";
import PublicProductList from "../components/public/PublicProductList";

export default function Home({ categories,products }) {
  return (
    <Layout title="Accueil">
      <PublicNavbar products={products} />
      <CategoriesSlider categories={categories} />
      <PublicProductList products={products} />
      {/* to attribute
      <a href='https://fr.freepik.com/photos/ecole'>École photo créé par freepik - fr.freepik.com</a>
      */}
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const categoriesUrl = await fetch(`${process.env.REST_API}/api/categories/get`);
  const categories = await categoriesUrl.json();
  const productsUrl = await fetch(`${process.env.REST_API}/api/product/get`);
  const products = await productsUrl.json();
  

  return { props: { categories,products } };
}
