import React from "react";
import { useTransaction } from "../context/TransactionContext";
// import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/helpers";
import { useFetch } from "../utils/custom-hooks";
import Loader from "./Loader";

const TransactionCard = ({ data }) => {
  const { loading, gifUrl } = useFetch(data.keyword);
  return (
    <div className="flex flex-col items-start flex-wrap bg-[#181918] p-3 rounded-md hover:shadow-2xl">
      <div>
        <span className="font-bold font-sans text-lg pr-2">From: </span>
        <a
          href={`https://goerli.etherscan.io/address/${data.addressFrom}`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm"
        >
          {shortenAddress(data.addressFrom)}
        </a>
      </div>
      <div>
        <span className="font-bold font-sans text-lg pr-2">To: </span>
        <a
          href={`https://goerli.etherscan.io/address/${data.addressTo}`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm"
        >
          {shortenAddress(data.addressTo)}
        </a>
      </div>
      <div>
        <span className="font-bold font-sans text-lg pr-2">Amount: </span>
        <span className="text-sm">{data.amount} ETH</span>
      </div>
      {data.message && (
        <div>
          <span className="font-bold font-sans text-lg pr-2">Message: </span>
          <span className="text-sm">{data.message}</span>
        </div>
      )}
      <div className="w-full">
        {loading ? (
          <Loader />
        ) : (
          <img
            src={gifUrl}
            className="rounded-lg mt-5 w-full h-[200px] object-cover"
            alt=""
          />
        )}
      </div>
      <div className="bg-black p-2 px-4 w-max rounded-3xl -mt-5 mx-auto">
        <p className="text-[#37c7da] font-bold text-sm">{data.timestamp}</p>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, transactions } = useTransaction();
  return (
    <div className="w-full" id="transactions">
      <div className=" flex items-center justify-center">
        {currentAccount ? (
          <h2 className="pb-12 px-4 text-3xl md:text-5xl text-center">
            Latest Transactions
          </h2>
        ) : (
          <h2 className="pb-12 px-4 text-3xl  md:text-5xl text-center">
            Connect your account to see latest transactions here
          </h2>
        )}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {transactions &&
          transactions?.map((data) => (
            <TransactionCard data={data} key={data.timestamp} />
          ))}
      </div>
    </div>
  );
};

export default Transactions;
