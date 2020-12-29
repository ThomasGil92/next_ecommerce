import Link from "next/link";

const CartShippingAddress = ({ infos,token }) => {
  return (
    <div className="row mx-0 flex-column h-100">
      <div
        className="col-6 text-center mt-3 mx-auto bg-white h-100 border border-light p-3 "
        style={{
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <h2>Adresse de livraison</h2>
        <div className="col-6 mx-auto mt-3 text-center">
          <p className="mb-0">
            {infos.first_name} {infos.last_name}
            <br />
            {infos.address}
            <br />
            {infos.zip_code}
            <br />
            {infos.city}
            <br />
            {infos.country}
          </p>
        </div>
      </div>
      <div className="col-6 mx-auto d-flex px-0">
        <Link href={`/user/update-address/${token}`} passHref>
          <button
            className="col-6 btn btn-outline-danger"
            style={{ borderRadius: "0 0 0 20px" }}
          >
            Modifier l'adresse de livraison
          </button>
        </Link>
        <button
          className="col-6 btn btn-primary"
          style={{ borderRadius: "0 0 20px 0" }}
        >
          Utiliser cette adresse
        </button>
      </div>
    </div>
  );
};

export default CartShippingAddress;
