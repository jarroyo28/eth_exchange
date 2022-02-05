import React, { Component } from "react";

class Main extends Component {
  render() {
    // const createProduct = this.props.createProduct;
    const { createProduct, purchaseProduct, products } = this.props;

    return (
      <div id="content">
        <h1>Add Product</h1>
        {/* We're going to call the createProduct function anytime the form is submitted */}
        <form
          onSubmit={(event) => {
            // This stops the page from refreshing on submit
            event.preventDefault();
            // Gets the name value from the form field
            console.log(this.productName.value);
            console.log(this.productPrice.value);
            const name = this.productName.value;
            // Gets the price value from the form field
            // We need to convert the value to Wei as well, which is shown below
            const price = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              "Ether"
            );
            createProduct(name, price);
          }}
        >
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              // React manages the values of these forms with refs, we assign the refs like shown below
              ref={(input) => {
                console.log(input);
                this.productName = input;
              }}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => {
                console.log(input);
                this.productPrice = input;
              }}
              className="form-control"
              placeholder="Product Price (in ETH)"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
        <p> </p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {products.map((product, idx) => {
              return (
                <tr key={idx}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      "Ether"
                    )}
                    Eth
                  </td>
                  <td>{product.owner}</td>
                  <td>
                    {!product.purchased ? (
                      <button
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          purchaseProduct(
                            event.target.name,
                            event.target.value
                          );
                        }}
                        className="buyButton"
                      >
                        Buy
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
