import { useSelector } from "react-redux";
import "./index.css";
import { Link } from "react-router-dom";
import { TbCurrencyTaka } from "react-icons/tb";

const BillCard = () => {
  const cartProducts = useSelector((state) => state.cart);
  let total = 0;
  cartProducts.forEach((product) => {
    total += product.qty * product.newPrice;
  });

  return (
    <div className="bill-card-container !bg-white !shadow-sm">
      <h1 className=" text-xl  ">Price Details</h1>
      <ul>
        {cartProducts.map((product) => (
          <li key={product.id} className="bill-item">
            <p>
              {product.name} ({product.qty})item
            </p>
            <div className="flex gap-1">
              {/* <TbCurrencyTaka className="text-xl" /> */}
              <div className="text-lg  -ml-1">
                {product.qty * product.newPrice} MAD
              </div>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <div>
        <p>Total</p>
        <div className="flex gap-1">
          {/* <TbCurrencyTaka className="text-2xl" /> */}
          <div className="text-2xl  -ml-1">{total} MAD</div>
        </div>
      </div>
      <Link to="/checkout" className=" text-center">
        <button
          type="button"
          className=" rounded-2xl  text-white p-2 px-4 bg-primary-500 hover:bg-primary-800"
        >
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default BillCard;
