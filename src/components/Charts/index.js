import React from "react";
import { Line } from "@ant-design/plots";
import "./styles.css";

function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((transaction) => {
    return {
      Date: transaction.date,
      Amount: transaction.amount,
    };
  });

  const config = {
    data,
    xField: "Date",
    yField: "Amount",
  };
  return (
    <div className="chart-container">
      <Line {...config} />
    </div>
  );
}

export default ChartComponent;
