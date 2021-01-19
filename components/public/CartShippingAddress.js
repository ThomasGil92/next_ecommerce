import Link from "next/link";
import {useSelector} from 'react-redux'

const CartShippingAddress = ({ infos, token, setAddress }) => {
  
  const user = useSelector((state) => state.user);
  const handleAddress = (e) => {
    e.preventDefault();
    setAddress(infos);
  };
  console.log(infos)
  return (
    
      <div
        className="col-4 text-center mt-3 bg-white h-100 border border-light px-0 "
        style={{
          borderRadius: "20px",
        }}
      >
        <h2>Adresse de livraison</h2>
        <div className="col-6 mx-auto mt-3 text-center">
          <p className="mb-0" style={{lineHeight:"1.2"}}>
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
        <div className="col-12 d-flex px-0 mt-3">
          <Link href={`/user/update-address/[id]`} as={`/user/update-address/${infos._id}`}>
            <button
              className="col-6 btn btn-outline-danger"
              style={{ borderRadius: "0 0 0 20px" }}
            >
              Modifier l'adresse de livraison
            </button>
          </Link>
          <button
            onClick={handleAddress}
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
