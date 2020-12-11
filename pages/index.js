import Layout from "../components/Layout";
import PublicNavBar from "../components/public/PublicNavbar";
import CategoriesSlider from "../components/public/CategoriesSlider";
import PublicProductList from "../components/public/PublicProductList";

export default function Home({ categories,products }) {
  console.log(products)
  return (
    <Layout>
      <PublicNavBar />
      <CategoriesSlider categories={categories} />
      <PublicProductList products={products} />
      {/* to attribute
      <a href='https://fr.freepik.com/photos/ecole'>École photo créé par freepik - fr.freepik.com</a>
      */}
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const categoriesUrl = await fetch("http://localhost:3000/api/categorie/get");
  const categories = await categoriesUrl.json();
  const productsUrl = await fetch("http://localhost:3000/api/product/get");
  const products = await productsUrl.json();

  return { props: { categories,products } };
}
