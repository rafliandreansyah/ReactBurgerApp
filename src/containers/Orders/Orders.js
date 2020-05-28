import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import errorHandler from "../../hoc/errorHandling/errorHandling";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        console.log(res.data);
        const fetchOrder = [];
        for (let key in res.data) {
          console.log(res.data[key]);
          fetchOrder.push({ ...res.data[key], id: key });
        }
        console.log(`FetchOrder ${fetchOrder}`);
        this.setState({ loading: false, orders: fetchOrder });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((data) => (
          <Order
            key={data.id}
            ingredients={data.ingredients}
            price={+data.price}
          />
        ))}
      </div>
    );
  }
}

export default errorHandler(Orders, axios);
