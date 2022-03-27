import React, { useState, useEffect } from "react";
import {
  CartProduct as CartProductType,
  Product,
} from "../../typings/defaultTypes";
import CartProduct from "../products/CartProduct";

interface IProps {
  cart: CartProductType[];
  products: Product[];
  changeProductAmount: (id: number, amount: number) => void;
  removeFromCart: (id: number) => void;
}

const Cart: React.FC<IProps> = ({
  cart,
  products,
  changeProductAmount,
  removeFromCart,
}) => {
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let amount = 0;
    let total = 0;

    cart &&
      cart.map((cartProduct) => {
        const product = products.find(
          (product) => product.id === cartProduct.productID
        );

        if (product) {
          total = total + product.price * cartProduct.amount;
          amount = amount + cartProduct.amount;
        }
      });

    setAmount(amount);
    setTotal(total);
  }, [cart]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    alert("Unavailable");
  };

  return (
    <div id="content">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Shopping cart</h3>
          </div>
          <div className="col-12 col-xl-8">
            <div className="shoppingTable mt-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product details</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length ? (
                    cart.map((cartProduct) => {
                      const product = products.find(
                        (product) => product.id === cartProduct.productID
                      );

                      return (
                        <CartProduct
                          key={cartProduct.productID}
                          product={product}
                          cartProduct={cartProduct}
                          changeProductAmount={changeProductAmount}
                          removeFromCart={removeFromCart}
                        />
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5}>Nothing in cart...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 col-md-6 offset-md-3 col-xl-3 offset-xl-1">
            <div className="shoppingTotal mt-5 p-4">
              <h4>Order summary</h4>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <td>Items</td>
                    <td>
                      <strong>{amount}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Total Price</td>
                    <td>
                      <strong>$ {total.toFixed(2)}</strong>
                    </td>
                  </tr>
                </thead>
              </table>
              <form onSubmit={(e: any) => handleSubmit(e)}>
                <button className="button w-100 no-styles mt-2">
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
