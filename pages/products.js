import NavBar from "../components/admin/Navbar";
import ProductsSideBar from "../components/admin/ProductsSideBar";
import CategoriesSideBar from "../components/admin/CategoriesSideBar";
import ProductsList from "../components/products/ProductsList";
import ProductsByCategoryComponent from "../components/categories/ProductsByCategoryComponent";
import LoadingState from "../components/admin/LoadingState";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Products = ({ categories, products }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [showProductsList, setShowProductsList] = useState(false);
  const isAuth = useSelector((state) => state.admin);

  useEffect(() => {
    if (!sessionStorage.getItem("admin") && !sessionStorage.getItem("master")) {
      router.push("/login");
    }
  }, [isAuth]);

  return (
    <Layout>
      <>
        <NavBar />
        <div className="row p-0 m-0">
          <ProductsSideBar
            setShowCategories={setShowCategories}
            showCategories={showCategories}
            setShowProductsList={setShowProductsList}
            setSelectedCategory={setSelectedCategory}
          />
          <CategoriesSideBar
            showCategories={showCategories}
            setShowCategories={setShowCategories}
            setSelectedCategory={setSelectedCategory}
            setShowProductsList={setShowProductsList}
            categories={categories}
          />
          {showProductsList &&
            selectedCategory === "" &&
            showProductsList === true && (
              <ProductsList products={products} categories={categories} />
            )}

          {selectedCategory && !showProductsList && selectedCategory !== "" && (
            <div
              className={showCategories ? "col-8 offset-4" : "col-10 offset-2"}
            >
              <ProductsByCategoryComponent
                selectedCategory={selectedCategory}
                products={products}
              />
            </div>
          )}
        </div>
      </>
    </Layout>
  );
};
export async function getServerSideProps(context) {
  const categoriesUrl = await fetch(
    `${process.env.REST_API}/api/categories/get`,
  );
  const productsUrl = await fetch(`${process.env.REST_API}/api/product/get`);
  const categories = await categoriesUrl.json();
  const products = await productsUrl.json();

  return { props: { categories, products } };
}

export default Products;
