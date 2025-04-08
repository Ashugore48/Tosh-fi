import { Button, Input, Radio, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import React, { use, useState } from "react";
import "./styles.css";
function TransactionsTable({ transactions }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];
  let filteredTransactions = transactions.filter(
    (item) =>
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.tag.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase())) &&
      item.type.includes(typeFilter)
  );
  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
  return (
    <div className="Transaction-flex">
      {/* <input
        value={search}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      /> */}
      <div className="input-flex">
        <Input
          className="table-search"
          value={search}
          type="text"
          placeholder="Search by Name, Tag or Type..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="radio-flex">
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            width: "400px",
          }}
        >
          <Button className="btn">Export to CSV</Button>

          {/* Label triggers hidden input */}
          <label htmlFor="file-csv">
            <Button className="btn btn-blue" type="primary">
              Import from CSV
            </Button>
          </label>

          <input
            id="file-csv"
            type="file"
            accept=".csv"
            required
            style={{ display: "none" }}
          />
        </div>
      </div>
      <Table
        className="transaction-table"
        dataSource={sortedTransactions}
        columns={columns}
      />
    </div>
  );
}

export default TransactionsTable;
