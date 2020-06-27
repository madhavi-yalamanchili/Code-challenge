// import React from "react";
// import axios from "axios";
// import "./App.css";

// class Converter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       result: null,
//       fromCurrency: "USD",
//       toCurrency: "GBP",
//       amount: 1,
//       currencies: [],
//     };
//   }
//   componentDidMount() {
//     axios
//       .get("https://api.exchangeratesapi.io/latest")
//       .then((response) => {
//         const currencyAr = ["EUR", "USD", "CHF"];
//         for (const key in response.data.rates) {
//           // consider the key value pair
//           currencyAr.push(key);
//         }
//         this.setState({ currencies: currencyAr }); //mapping with currency array
//       })
//       .catch((err) => {
//         console.log("there seems to be an error, please try again!!!", err);
//       });
//   }
//   convertHandler = () => {
//     if (this.state.fromCurrency !== this.state.toCurrency) {
//       axios
//         .get(
//           `https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`
//         )
//         .then((response) => {
//           const result =
//             this.state.amount * response.data.rates[this.state.toCurrency];
//           this.setState({ result: result.toFixed(5) });
//         })
//         .catch((err) => {
//           console.log(
//             "there seems to be an error, please try again!!!",
//             err.message
//           );
//         });
//     } else {
//       this.setState({
//         result: "Sorry!You cannot convert with the same currency!",
//       });
//     }
//   };
//   selectHandler = (event) => {
//     if (event.target.name === "from") {
//       this.setState({ fromCurrency: event.target.value });
//     } else {
//       if (event.target.name === "to") {
//         this.setState({ toCurrency: event.target.value });
//       }
//     }
//   };
//   render() {
//     return (
//       <div className="Converter">
//         <div className="background-upper-half">
//           <h2 className="pickar-logo-white">
//             <img src="pickar_logo_white.png" />
//           </h2>
//           <p className="headline">Convert currencies in real-time.</p>
//         </div>
//         <div className="box-background">
//           <form className="Form">
//             <label>Amount</label>
//             <input
//               className="input-field"
//               name="amount"
//               type="text"
//               value={this.state.amount}
//               onChange={(event) =>
//                 this.setState({ amount: event.target.value })
//               }
//             />
//             <label>From</label>
//             <select
//               name="from"
//               onChange={(event) => this.selectHandler(event)}
//               value={this.state.fromCurrency}
//             >
//               {this.state.currencies.map((cur) => (
//                 <option key={cur}>{cur}</option>
//               ))}
//             </select>
//             <label>To</label>
//             <img src="Switcher.png" />
//             <select
//               name="to"
//               onChange={(event) => this.selectHandler(event)}
//               value={this.state.toCurrency}
//             >
//               {this.state.currencies.map((cur) => (
//                 <option key={cur}>{cur}</option>
//               ))}
//             </select>
//             <button onClick={this.convertHandler}>Convert</button>

//             {this.state.result && (
//               <h3>
//                 {this.state.fromCurrency}
//                 {this.state.result}
//                 {this.state.toCurrency}
//               </h3>
//             )}
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
// export default Converter;
import React from "react";
import axios from "axios";
import "./App.css";
class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "USD",
      toCurrency: "GBP",
      amount: 1,
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
        this.setState({ currencies: currencyAr });
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
            <p className="name"> Amount</p>

            <input
              name="amount"
              type="text"
              value={this.state.amount}
              onChange={(event) =>
                this.setState({ amount: event.target.value })
              }
            />
            <select
              name="from"
              onChange={(event) => this.selectHandler(event)}
              value={this.state.fromCurrency}
            >
              {this.state.currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
            <select
              name="to"
              onChange={(event) => this.selectHandler(event)}
              value={this.state.toCurrency}
            >
              {this.state.currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
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
