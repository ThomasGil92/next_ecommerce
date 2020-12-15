import Layout from "../components/Layout";
import PublicNavBar from "../components/public/PublicNavBar";
import CartRecap from "../components/public/CartRecap";
const Cart = () => {
  return (
    <Layout>
      <PublicNavBar />
      <div className="row flex-column mt-5 pt-3 mx-0 bg-third">
        <div className="col-6 py-3 mx-auto d-flex justify-content-between">
          <div
            className="circle bg-warning m-2 text-center text-center d-flex justify-content-center align-items-center"
            style={{ width: "75px", height: "75px", borderRadius: "37.5px",zIndex:"1" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-cart-check text-danger"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
              />
              <path
                fillRule="evenodd"
                d="M11.354 5.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </div>
          <div
            className="circle bg-third m-2 d-flex justify-content-center align-items-center text-white"
            style={{ width: "75px", height: "75px", borderRadius: "37.5px",zIndex:"1",backgroundColor:"#e6e6e6" }}
          >
            <strong style={{ fontSize: "25px" }}>2</strong>
          </div>
          <div
            className="circle m-2 d-flex justify-content-center align-items-center text-white"
            style={{ width: "75px", height: "75px", borderRadius: "37.5px",zIndex:"1",backgroundColor:"#e6e6e6" }}
          >
            <strong style={{ fontSize: "25px" }}>3</strong>
          </div>
        </div>
        <div className="col-5 position-absolute" style={{minHeight:"4px",top:125,left:"30%",zIndex:"0",backgroundColor:"#e6e6e6"}}></div>
      </div>
    <CartRecap/>
    </Layout>
  );
};
export default Cart;
