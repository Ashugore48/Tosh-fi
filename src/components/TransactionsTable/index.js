import { Button, Input, Radio, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import React, { use, useState } from "react";
import "./styles.css";
import Papa, { parse } from "papaparse";
import { toast } from "react-toastify";
function TransactionsTable({
  transactions,
  addTransaction,
  fetchTransactions,
}) {
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
  function exportToCSV() {
    var csv = Papa.unparse({
      fields: ["name", "amount", "tag", "date", "type"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  async function importFromCsv(event) {
    event.preventDefault();
    try {
      const file = event.target.files[0];
      if (!file) {
        toast.error("No file selected!");
        return;
      }

      parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
          const rows = results.data;
          console.log("Parsed CSV Data:", rows);

          for (const transaction of rows) {
            // Clean and parse amount
            const rawAmount = (transaction.amount || "")
              .toString()
              .replace(/[^0-9.-]/g, "");
            const parsedAmount = parseFloat(rawAmount);

            // Clean and normalize other fields if needed
            const newTransaction = {
              name: transaction.name?.trim() || "Unnamed",
              tag: transaction.tag?.trim() || "other",
              date:
                transaction.date?.trim() ||
                new Date().toISOString().slice(0, 10), // fallback to today's date
              type: transaction.type?.trim().toLowerCase() || "expense",
              amount: isNaN(parsedAmount) ? 0 : parsedAmount,
            };

            // console.log("Saving transaction:", newTransaction);
            await addTransaction(newTransaction, true);
          }

          toast.success("All Transactions Added 🎉");
          fetchTransactions(); // refresh UI
          event.target.value = null; // reset file input
        },
        error: (err) => {
          console.error("CSV parsing error:", err);
          toast.error("Error parsing CSV file.");
        },
      });
    } catch (e) {
      console.error("Import failed:", e);
      toast.error("Something went wrong during import 🥲");
    }
  }

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
          <Button className="btn" onClick={exportToCSV}>
            Export to CSV
          </Button>

          {/* Label triggers hidden input */}
          <label htmlFor="file-csv" className="btn">
            Import from CSV
          </label>

          <input
            id="file-csv"
            type="file"
            accept=".csv"
            onChange={importFromCsv}
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
