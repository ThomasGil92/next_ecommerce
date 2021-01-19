import LoadingState from "../../../components/admin/LoadingState";
import PublicNavBar from "../../../components/public/PublicNavBar";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import UserUpdateAddressForm from "../../../components/user/UserUpdateAddressForm";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const UpdateAddress = ({ products }) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: user, error } = useSWR(
    id ? `/api/user/get/${id}` : null,
    fetcher,
  );

  if (error) return <p>Failed to load</p>;
  if (!user)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  const userForm = {
    _id: user.user._id,
    address: user.user.address,
    first_name: user.user.first_name,
    last_name: user.user.last_name,
    zip_code: user.user.zip_code,
    city: user.user.city,
    country: user.user.country,
  };
  return (
    <Layout>
      <PublicNavBar products={products} />
      <div className="row mt-5 pt-5 mx-0 text-center">
        <UserUpdateAddressForm user={userForm} />
      </div>
    </Layout>
  );
};

export default UpdateAddress;

export async function getServerSideProps(context) {
  const productsUrl = await fetch("http://localhost:3000/api/product/get");
  const products = await productsUrl.json();

  return { props: { products } };
}
