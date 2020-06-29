import React from "react";
import axios from "axios";
import "./App.css";
class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "EUR",
      toCurrency: "USD",
      amount: 1.0,
      currencies: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://api.exchangeratesapi.io/latest")
      .then((response) => {
        const currencyAr = ["EUR"];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr }); //mapping with currency array
      })
      .catch((err) => {
        console.log("oppps", err);
      });
  }
  convertHandler = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`
        )
        .then((response) => {
          const result =
            this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(5) });
        })
        .catch((error) => {
          console.log("Opps", error.message);
        });
    } else {
      this.setState({ result: "You cant convert the same currency!" });
    }
  };
  selectHandler = (event) => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    } else {
      if (event.target.name === "to") {
        this.setState({ toCurrency: event.target.value });
      }
    }
  };
  render() {
    return (
      <div className="Converter">
        <div className="background-upper-half">
          <h2 className="pickar-logo-white">
            <img src="pickar_logo_white.png" />
          </h2>
          <p className="headline">Convert currencies in real-time.</p>
        </div>

        <div className="box-background">
          <div className="Form">
            <div className="div">
              <label className="name">Amount</label>
              <input
                name="amount"
                type="text"
                value={this.state.amount}
                onChange={(event) =>
                  this.setState({ amount: event.target.value })
                }
              />
            </div>
            <div className="div">
              <label className="name">From</label>
              <select
                name="from"
                onChange={(event) => this.selectHandler(event)}
                value={this.state.fromCurrency}
              >
                {this.state.currencies.map((cur) => (
                  <option key={cur}>{cur}</option>
                ))}
              </select>
            </div>
            <div className="div">
              <label className="name">To</label>
              <img src="Switcher.png" />
              <select
                name="to"
                onChange={(event) => this.selectHandler(event)}
                value={this.state.toCurrency}
              >
                {this.state.currencies.map((cur) => (
                  <option key={cur}>{cur}</option>
                ))}
              </select>
            </div>
            <button onClick={this.convertHandler}>Convert</button>
          </div>
        </div>
        {this.state.result && (
          <h3>
            {this.state.amount}
            &nbsp;
            {this.state.fromCurrency} {"="}
            &nbsp;
            {this.state.result}
            &nbsp;
            {this.state.toCurrency}
          </h3>
        )}
      </div>
    );
  }
}
export default Converter;
