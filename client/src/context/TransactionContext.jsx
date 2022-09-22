import React, { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { useState } from "react";

const TransactionContext = createContext();

export const useTransaction = () => useContext(TransactionContext);

const INITIAL_FORM_DATA = {
  addressTo: "",
  amount: "",
  keyword: "",
  message: "",
};

const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    JSON.parse(localStorage.getItem("transactionCount"))
  );
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const connectToWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install Metamask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionExists = async () => {
    try {
      const transactionContract = getContract();
      const count = await transactionContract.getTransactionCount();
      localStorage.setItem("transactionCount", JSON.stringify(count));
    } catch (errors) {
      console.log(errors);
    }
  };

  const getAllTransactions = async () => {
    try {
      if (!window.ethereum) return;
      const transactionContract = getContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();
      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressFrom: transaction.from,
          addressTo: transaction.reciever,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
          message: transaction.message,
          keyword: transaction.keyword,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
        })
      );
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const getConnectedAccount = async () => {
    try {
      if (!window.ethereum) return;

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  };

  const sendTransaction = async () => {
    try {
      if (!window.ethereum) return alert("Please install Metamask");

      const transactionContract = getContract();
      const parsedAmount = ethers.utils.parseEther(formData.amount);

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: formData.addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });
      const transactionHash = await transactionContract.addToBlockchain(
        formData.addressTo,
        parsedAmount,
        formData.message,
        formData.keyword
      );
      setLoading(true);
      await transactionHash.wait();
      setLoading(false);
      setFormData(INITIAL_FORM_DATA);
      const count = await transactionContract.getTransactionCount();
      localStorage.setItem("transactionCount", JSON.stringify(count));
      setTransactionCount(count.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnectedAccount();
    checkIfTransactionExists();
    // eslint-disable-next-line
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        getContract,
        connectToWallet,
        currentAccount,
        sendTransaction,
        handleChange,
        formData,
        loading,
        transactionCount,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
