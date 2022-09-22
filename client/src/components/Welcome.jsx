import React from "react";
import { FaEthereum } from "react-icons/fa";
import { useTransaction } from "../context/TransactionContext";
import { shortenAddress } from "../utils/helpers";
import Loader from "./Loader";

const Welcome = () => {
  const { currentAccount, handleChange, formData, sendTransaction, loading } =
    useTransaction();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { addressTo, amount, message, keyword } = formData;
    if (!addressTo || !amount || !keyword || !message) return;
    sendTransaction();
  };

  return (
    <div className="mt-16 sm:px-16 lg:px-20 flex flex-col md:flex-row justify-between items-start gap-x-20 flex-1">
      <div className="flex flex-1 flex-col">
        <h2 className="text-3xl sm:text-5xl text-gradient">
          Send Crypto across the world.
        </h2>
        <p className="py-5">
          Explore the crypto world. Buy and sell cryptocurrencies across the
          world on Krypto.
        </p>
        {currentAccount ? (
          <button
            type="button"
            className=" bg-green-600 cursor-not-allowed duration-500 px-5 py-3 my-4 rounded-full font-semibold text-base"
          >
            Connected
          </button>
        ) : (
          <button
            type="button"
            className=" bg-indigo-600 cursor-not-allowed duration-500 px-5 py-3 my-4 rounded-full font-bold text-lg"
          >
            Not Connected
          </button>
        )}

        <div className="grid sm:grid-cols-3 grid-cols-2 my-8">
          <div className="rounded-tl-2xl border-2 justify-center items-center flex h-14 border-gray-400">
            Reliability
          </div>
          <div className="rounded-tr-2xl sm:rounded-none border-2 justify-center items-center flex h-14 border-gray-400">
            Security
          </div>
          <div className="sm:rounded-tr-2xl border-2 justify-center items-center flex h-14 border-gray-400">
            Ethereum
          </div>
          <div className="sm:rounded-bl-2xl border-2 justify-center items-center flex h-14 border-gray-400">
            Web 3.0
          </div>
          <div className="rounded-bl-2xl sm:rounded-none border-2 justify-center items-center flex h-14 border-gray-400">
            Low Fees
          </div>
          <div className="rounded-br-2xl border-2 justify-center items-center flex h-14 border-gray-400">
            Blockchain
          </div>
        </div>
      </div>
      <div
        className="flex flex-col flex-1 justify-start items-center"
        id="sendEth"
      >
        <a
          href="https://ethereum.org"
          target="_blank"
          rel="noreferrer"
          className="eth-card white-glassmorphism w-full md:w-2/3 h-40 relative"
        >
          <FaEthereum className="w-6 h-6 m-3 border rounded-full p-[2.5px] ml-auto" />
          <div className="absolute bottom-2 left-2">
            <div>Ethereum</div>
            <div className="text-[0.6rem]">
              {currentAccount ? shortenAddress(currentAccount) : "Address"}
            </div>
          </div>
        </a>

        <form
          className="mt-10 blue-glassmorphism p-4"
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            onChange={handleChange}
            value={formData.addressTo}
            name="addressTo"
            className="w-full px-3 py-2 my-2 rounded-md bg-transparent outline-none white-glassmorphism"
            placeholder="Address To"
          />
          <input
            type="number"
            onChange={handleChange}
            value={formData.amount}
            name="amount"
            className="w-full px-3 py-2 my-2 rounded-md bg-transparent outline-none white-glassmorphism"
            placeholder="Amount (ETH)"
          />
          <input
            type="text"
            onChange={handleChange}
            value={formData.keyword}
            name="keyword"
            className="w-full px-3 py-2 my-2 rounded-md bg-transparent outline-none white-glassmorphism"
            placeholder="Keyword (GIF)"
          />
          <input
            type="text"
            onChange={handleChange}
            value={formData.message}
            name="message"
            className="w-full px-3 py-2 my-2 rounded-md bg-transparent outline-none white-glassmorphism"
            placeholder="Message"
          />
          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="text-center w-full my-3 p-3 bg-indigo-600 hover:bg-indigo-800 duration-500 rounded-full disabled:bg-gray-700 disabled:cursor-not-allowed"
              disabled={!currentAccount}
            >
              Send Now
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Welcome;
