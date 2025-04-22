import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import TransactionsTable from "../components/TransactionsTable";
import ChartComponent from "../components/Charts";
import NoTransactions from "../components/NoTransaction";
import About from "../components/About";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  function showExpenseModal() {
    setIsExpenseModalVisible(true);
  }
  function showIncomeModal() {
    setIsIncomeModalVisible(true);
  }
  function handleExpenseModalCancel() {
    setIsExpenseModalVisible(false);
  }
  function handleIncomeModalCancel() {
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values, type) => {
    const newTranscation = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      tag: values.tag,
      name: values.name,
      amount: parseFloat(values.amount),
    };
    addTransaction(newTranscation);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      // console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      // console.log(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }
  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  async function resetBalance() {
    try {
      const querySnapshot = await getDocs(
        collection(db, `users/${user.uid}/transactions`)
      );

      const deletePromises = querySnapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, `users/${user.uid}/transactions`, docSnap.id))
      );

      await Promise.all(deletePromises);

      toast.success("All transactions deleted!");
      setTransactions([]); // Clear local state too
      calculateBalance(); // Recalculate (will probably be 0 now)
    } catch (error) {
      console.error("Error deleting transactions: ", error);
      toast.error("Failed to delete all transactions.");
    }
  }

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            resetBalance={resetBalance}
          />
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseModalCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeModalCancel}
            onFinish={onFinish}
          />
          {transactions.length == 0 ? (
            <NoTransactions />
          ) : (
            <ChartComponent sortedTransactions={sortedTransactions} />
          )}
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
          <About />
        </>
      )}
    </div>
  );
};

export default Dashboard;
