import PublicNavBar from "../../../components/public/PublicNavBar";
import Layout from "../../../components/Layout";
import UserUpdateAddressForm from "../../../components/user/UserUpdateAddressForm";

const UpdateAddress = ({ products, user }) => {
  return (
    <Layout>
      <PublicNavBar products={products} />
      <div className="row mt-40 mt-md-5 pt-4 pt-md-5 mx-0 text-center">
        <UserUpdateAddressForm user={user} />
      </div>
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
