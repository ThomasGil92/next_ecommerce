import Layout from "../../components/Layout";
import NavBar from "../../components/admin/Navbar";
import ProfileForm from "../../components/admin/ProfileForm";
import { useRouter } from "next/router";
import axios from "axios";
import dbConnect from "../../utils/dbConnect";
const ProfilePage = ({ email,name }) => {
  const router = useRouter();
  return (
    <Layout>
      <NavBar />
      <div
        className="w-100 d-flex flex-column align-items-center justify-content-center text-center position-absolute pt-5 mt-5"
        style={{ top: "0" }}
      >
       <h2 className="mb-4">Votre profil entreprise</h2>
        <ProfileForm userEmail={email} userName={name} query={router.query.id} />
      </div>
    </Layout>
  );
};
export async function getServerSideProps({ query }) {
  const id = query.id;
  
  const adminUrl = await fetch(`${process.env.REST_API}/api/admin/${id}`);
  const admin = await adminUrl.json();
  const {name,email}=admin
  //const { email,name } = await Admin.findById(id);

  return { props: { email,name } };
}

export default ProfilePage;
