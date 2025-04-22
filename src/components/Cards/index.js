import React from "react";
import "./styles.css";
import { Row, Card } from "antd";
import Button from "../Button";

function Cards({
  income,
  expense,
  totalBalance,
  showExpenseModal,
  showIncomeModal,
  resetBalance,
}) {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card" title="Current Balance">
          ₹{totalBalance}
          <Button
            text={"Reset Balance"}
            blue={true}
            onClick={resetBalance}
          ></Button>
        </Card>
        <Card className="my-card" title="Total Income">
          ₹{income}
          <Button
            text={"Add Income"}
            blue={true}
            onClick={showIncomeModal}
          ></Button>
        </Card>
        <Card className="my-card" title="Total Expense">
          ₹{expense}
          <Button
            text={"Add Expense"}
            blue={true}
            onClick={showExpenseModal}
          ></Button>
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
