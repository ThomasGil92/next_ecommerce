import Layout from "../../components/Layout";
import PublicNavbar from "../../components/public/PublicNavbar";
import CategoryHeader from "../../components/public/CategoryHeader";
import ProductsByCategoryList from "../../components/public/ProductsByCategoryList";
import { useEffect } from "react";
import { useRouter } from "next/router";
const CategoryById = ({ products, category }) => {
  const router = useRouter();
  useEffect(() => {
    if (!category) {
      router.push("/");
    }
  });

  return (
    <Layout title={category && category.category.categoryName}>
      <PublicNavbar />
      <CategoryHeader category={category} />
      <ProductsByCategoryList products={products} />
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const id = params.id;
  const categoryUrl = await fetch(`${process.env.REST_API}/api/category/${id}`);
  const category = await categoryUrl.json();

  const productsUrl = await fetch(`${process.env.REST_API}/api/product/get`);
  const products = await productsUrl.json();

  return {
    props: {
      category,
      products,
    },
  };
};

export default CategoryById;
