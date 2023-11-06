import React, { Component } from 'react';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      apr: 0,
      years: 0,
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
    };
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

 //lógica de cálculo aqui e atualize o estado com os resultados.
  calculate = () => {
    const { amount, apr, years, zipcode } = this.state;
    const principal = parseFloat(amount);
    const interest = parseFloat(apr) / 100 / 12;
    const payments = parseFloat(years) * 12;

    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);

    if (isFinite(monthly)) {
      this.setState({
        monthlyPayment: monthly.toFixed(2),
        totalPayment: (monthly * payments).toFixed(2),
        totalInterest: ((monthly * payments) - principal).toFixed(2),
      });

      // Chamadas para funções save, getLenders e chart aqui

    } else {
      this.setState({
        monthlyPayment: '',
        totalPayment: '',
        totalInterest: '',
      });

      // Chamada para a função chart vazia
      
    }

    function chart(principal, interest, monthly, payments) {
        var graph = document.getElementById("graph");
        graph.width = graph.width;
      
        if (arguments.length === 0 || !graph.getContext) return;
      
        var g = graph.getContext("2d");
        var width = graph.width, height = graph.height;
      
        function paymentToX(n) {
          return n * width / payments;
        }
      
        function amountToY(a) {
          return height - (a * height / (monthly * payments * 1.05));
        }
      
        g.moveTo(paymentToX(0), amountToY(0));
        g.lineTo(paymentToX(payments), amountToY(monthly * payments));
        g.lineTo(paymentToX(payments), amountToY(0));
      
        g.closePath();
        g.fillStyle = "#f88";
        g.fill();
        g.font = "bold 12px sans-serif";
        g.fillText("Total Interest Payments", 20, 20);
      
      }
      

  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Enter Loan Data:</th>
              <td></td>
              <th>Loan Balance, Cumulative Equity, and Interest Payments</th>
            </tr>

            <tr>
              <td>Amount of the loan ($):</td>
              <td>
                <input
                  id="amount"
                  type="number"
                  onChange={this.handleInputChange}
                  value={this.state.amount}
                />
              </td>
              <td rowspan="8">
                <canvas id="graph" width="400" height="250"></canvas>
              </td>
            </tr>

            <tr>
              <td>Annual interest (%):</td>
              <td>
                <input
                  id="apr"
                  type="number"
                  onChange={this.handleInputChange}
                  value={this.state.apr}
                />
              </td>
            </tr>

            <tr>
              <td>Repayment period (years):</td>
              <td>
                <input
                  id="years"
                  type="number"
                  onChange={this.handleInputChange}
                  value={this.state.years}
                />
              </td>
            </tr>

            <tr>
              <td>Zipcode (to find lenders):</td>
              <td>
                <input
                  id="zipcode"
                  type="text"
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>

            <tr>
              <th>Approximate Payments (%):</th>
              <td>
                <button onClick={this.calculate}>Calculate</button>
              </td>
            </tr>

            <tr>
              <td>Monthly payments:</td>
              <td>$<span className="output" id="payment">{this.state.monthlyPayment}</span></td>
            </tr>

            <tr>
              <td>Total payment:</td>
              <td>$<span className="output" id="total">{this.state.totalPayment}</span></td>
            </tr>

            <tr>
              <td>Total interest:</td>
              <td>$<span className="output" id="totalinterest">{this.state.totalInterest}</span></td>
            </tr>

            <tr>
              <th>Sponsors:</th>
              <td colSpan="2">
                Apply for your loan with one of these fine lenders:
                <div id="lenders"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;


