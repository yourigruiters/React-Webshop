import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/Home";
import Shop from "./components/Shop";
import About from "./components/About";
import Contact from "./components/Contact";

import CompleteProduct from "./components/products/CompleteProduct";

import Login from "./components/auth/Login";
import Cart from "./components/cart/Cart";

import Error404 from "./components/error/Error404";

class App extends Component {
  state = {
    products: [
      { id: 1, title: "Product 1", content: "Content...", price: 39.99 },
      { id: 2, title: "Product 2", content: "Content...", price: 29.99 },
      { id: 3, title: "Product 3", content: "Content...", price: 19.99 },
      { id: 4, title: "Product 4", content: "Content...", price: 25.99 }
    ],
    cartItems: 0
  };

  componentDidMount() {
    let cartAmount;
    if (localStorage.getItem("cart") !== null) {
      cartAmount = JSON.parse(localStorage.getItem("cart")).length;
    } else {
      cartAmount = 0;
    }

    this.setState({
      cartItems: cartAmount
    });
  }

  changeCart = () => {
    let cartAmount;
    if (localStorage.getItem("cart") !== null) {
      cartAmount = JSON.parse(localStorage.getItem("cart")).length;
    } else {
      cartAmount = 0;
    }

    this.setState({
      cartItems: cartAmount
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="webshop">
          <Header cartItems={this.state.cartItems} />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Home
                  {...props}
                  products={this.state.products}
                  changeCart={this.changeCart}
                />
              )}
            />
            <Route
              path="/shop"
              exact
              render={(props) => (
                <Shop
                  {...props}
                  products={this.state.products}
                  changeCart={this.changeCart}
                />
              )}
            />
            <Route
              path="/shop/:id"
              exact
              render={(props) => (
                <CompleteProduct
                  {...props}
                  products={this.state.products}
                  changeCart={this.changeCart}
                />
              )}
            />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/login" exact component={Login} />
            <Route
              path="/cart"
              exact
              render={(props) => (
                <Cart
                  {...props}
                  products={this.state.products}
                  changeCart={this.changeCart}
                />
              )}
            />
            <Route path="/" component={Error404} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
