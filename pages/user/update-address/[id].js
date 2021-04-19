import PublicNavBar from "../../../components/public/PublicNavBar";
import Layout from "../../../components/Layout";
import UserUpdateAddressForm from "../../../components/user/UserUpdateAddressForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const UpdateAddress = ({ products, user }) => {
  const router = useRouter();
  const userAuth = useSelector((state) => state.user);

  useEffect(() => {
    if (!userAuth.token) {
      router.push("/user/login");
    }
  });

  return (
    <Layout title={"Adresse de livraison"}>
      {userAuth.token ? (
        <>
          <PublicNavBar products={products} />
          <div className="row mt-40 mt-md-5 pt-4 pt-md-5 mx-0 text-center">
            <UserUpdateAddressForm user={user} />
          </div>
        </>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default UpdateAddress;

export async function getServerSideProps(context) {
  const { id } = context.params;
  /* const { id } = context.query; */
  const productsUrl = await fetch(`${process.env.REST_API}/api/product/get`);
  const userUrl = await fetch(`${process.env.REST_API}/api/user/get/${id}`);
  const products = await productsUrl.json();
  const user = await userUrl.json();

  return { props: { products, user } };
}
