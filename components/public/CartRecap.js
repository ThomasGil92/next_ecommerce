import { useState, useEffect } from "react";

const CartRecap = () => {
  const [allProductInCart, setAllProductInCart] = useState();
  useEffect(() => {
    var cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    setAllProductInCart(cart);
  }, []);

const total=product=>{
    const t=product.price*product.quantityInCart
    return t
}

const totalCart=()=>{
    //
}

  return (
    <div className="row m-0">
      {allProductInCart &&
        allProductInCart.map((product, i) => (
          <div key={i} className="col-10 my-3 py-2 d-flex mx-auto rounded bg-white">
            <div className="col-6 d-flex align-items-center">
              <img
                src={product.imageUrl}
                style={{ width: "80px", height: "80px" }}
              />
              <div className="ml-5" style={{textTransform:"uppercase",fontWeight:"600",lineHeight:"16px",fontSize:"12px"}}>{product.productName}</div>
            </div>
            <div className="col-6 d-flex align-items-center">
                <p className="ml-auto"><strong>{total(product)} &euro;</strong></p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CartRecap;
