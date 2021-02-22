import Layout from "../../../components/Layout";
import { useEffect } from "react";
import PublicNavBar from "../../../components/public/PublicNavBar";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const UserProfile = ({ user }) => {
  const router = useRouter();
  const theme = useSelector((state) => state.theme);
  const userAuth = useSelector((state) => state.user);

  useEffect(() => {
    if (process.browser) {
      if (sessionStorage.getItem("user")) {
        const userInSession = JSON.parse(sessionStorage.getItem("user"));
        console.log(router.query);
        if (userInSession.user._id !== router.query.id) {
          router.push("/user/login");
        }
      }else if(!userAuth.token){
        router.push("/user/login")
      }
    }
  });

  return (
    <Layout>
      {userAuth.token ? (
        <>
          <PublicNavBar />
          <div
            className={
              theme === "dark"
                ? "row mt-5 pt-5 mx-0 bg-dark text-white"
                : "row mt-5 pt-5 mx-0 bg-third"
            }
          >
            <div className="col-11 col-md-9 mx-auto">
              <h4 className="mb-4 text-center text-md-left">Votre compte</h4>
              <div className="row m-0 justify-content-around">
                <Link href={`/user/profile/commandes/${user.user._id}`}>
                  <div
                    className={
                      theme === "dark"
                        ? "col-md-4 dark-profile-hover-color border border-warning d-flex align-items-center px-0 px-md-2 py-2 mb-4 mb-md-0"
                        : "col-md-4 profile-hover-color border d-flex align-items-center px-0 px-md-2 py-2 mb-4 mb-md-0"
                    }
                  >
                    <div className="col-3 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-box"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                      </svg>
                    </div>
                    <div className="col-8 text-md-left text-right px-0 px-md-2">
                      <h5>Vos commandes</h5>
                      <p style={{ lineHeight: "1", marginBottom: "0px" }}>
                        Suivre l'état de votre commande, consulter votre
                        historique de commandes
                      </p>
                    </div>
                  </div>
                </Link>
                <Link href={`/user/update-address/${user.user._id}`}>
                  <div
                    className={
                      theme === "dark"
                        ? "col-md-4 dark-profile-hover-color border border-warning d-flex align-items-center px-0 px-md-2 py-2 mb-4 mb-md-0"
                        : "col-md-4 profile-hover-color border d-flex align-items-center px-0 px-md-2 py-2 mb-4 mb-md-0"
                    }
                  >
                    <div className="col-3 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-geo-alt"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>
                    </div>
                    <div className="col-8 text-md-left text-right px-0 px-md-2">
                      <h5>Adresse</h5>
                      <p style={{ lineHeight: "1", marginBottom: "0px" }}>
                        Modifier votre adresse de livraison
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const userUrl = await fetch(`${process.env.REST_API}/api/user/get/${id}`);
  const user = await userUrl.json();
  return { props: { user } };
}
