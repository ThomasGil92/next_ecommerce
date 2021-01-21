import Layout from "../../../../components/Layout";
import PublicNavBar from "../../../../components/public/PublicNavBar";

const OrdersHistoric = ({ user }) => {
  return (
    <Layout>
      <PublicNavBar />
    </Layout>
  );
};

export default OrdersHistoric

export async function getServerSideProps(context) {
  const { id } = context.query;
  const userUrl = await fetch(`http://localhost:3000/api/user/get/${id}`);
  const user = await userUrl.json();
  return { props: { user } };
}
