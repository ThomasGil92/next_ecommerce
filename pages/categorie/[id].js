import Layout from "../../components/Layout";
import PublicNavBar from "../../components/public/PublicNavbar";
import CategoryHeader from "../../components/public/CategoryHeader";
import ProductsByCategoryList from "../../components/public/ProductsByCategoryList";
import { useEffect } from "react";
import { useRouter } from "next/router";
const CategoryById = ({ products, category }) => {
  const router = useRouter();
  useEffect(() => {
    if (!category.category) {
      router.push("/");
    }
  });

  return (
    <Layout>
      <PublicNavBar />
      <CategoryHeader category={category}/>
      <ProductsByCategoryList products={products}/>
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const code = params.id;
  const categoryUrl = await fetch(
    `http://localhost:3000/api/public-category/${code}`,
  );
  const category = await categoryUrl.json();

  const productsUrl = await fetch("http://localhost:3000/api/product/get");
  const products = await productsUrl.json();

  return {
    props: {
      category,
      products
    },
  };
};

export default CategoryById;
