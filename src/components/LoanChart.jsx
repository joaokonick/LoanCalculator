import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

function LoanChart({ principal, interest, monthly, payments }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    drawChart();
  }, [principal, interest, monthly, payments]);

  const calculateLoanData = () => {
    // Realize os cálculos necessários com base nos campos do formulário
    const loanBalanceData = [];
    const totalEquityData = [];

    for (let month = 1; month <= payments; month++) {
      const thisMonthsInterest = (principal - loanBalanceData[month - 1]) * (interest / 12);
      const newLoanBalance = loanBalanceData[month - 1] - (monthly - thisMonthsInterest);

      loanBalanceData.push(newLoanBalance);
      totalEquityData.push(principal - newLoanBalance);
    }

    return { loanBalanceData, totalEquityData };
  };

  const drawChart = () => {
    if (chartRef.current) {
      const { loanBalanceData, totalEquityData } = calculateLoanData();
      const graph = chartRef.current;
      const g = graph.getContext("2d");

      chartInstance.current = new Chart(g, {
        type: 'line',
        data: {
          labels: Array.from({ length: payments }, (_, i) => i + 1),
          datasets: [
            {
              label: 'Loan Balance',
              borderColor: 'black',
              data: loanBalanceData,
            },
            {
              label: 'Total Equity',
              borderColor: 'green',
              data: totalEquityData,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  };

  return <canvas ref={chartRef} width="400" height="250"></canvas>;
}

export default LoanChart;





