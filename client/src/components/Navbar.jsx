import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTransaction } from "../context/TransactionContext";
import Drawer from "./Drawer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { connectToWallet, currentAccount } = useTransaction();
  return (
    <nav className="flex justify-between mt-3">
      <div className="logo flex gap-3 justify-center items-center">
        <img src="/images/metamask.svg" alt="logo" className="w-8 h-8" />
        <div className="font-bold text-2xl tracking-widest">KRYPT</div>
      </div>
      <ul className="hidden md:flex gap-10 items-center font-semibold">
        <li className="cursor-pointer hover:underline underline-offset-8 duration-500	">
          <a href="#sendEth">Send Eth</a>
        </li>
        <li className="cursor-pointer hover:underline underline-offset-8 duration-500	">
          <a href="#services">Services</a>
        </li>
        <li className="cursor-pointer hover:underline underline-offset-8 duration-500	">
          <a href="#transactions">Transactions</a>
        </li>
        <li className="cursor-pointer hover:underline underline-offset-8 duration-500	">
          <a href="#contact">Contact Us</a>
        </li>
      </ul>
      {!currentAccount && (
        <button
          className="hidden md:block bg-indigo-600 hover:bg-indigo-800 duration-500 px-5 py-2 rounded-full"
          onClick={connectToWallet}
        >
          Connect Wallet
        </button>
      )}

      <GiHamburgerMenu
        className="md:hidden text-2xl"
        onClick={() => setIsOpen(true)}
      />
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Menu">
        <ul className="flex flex-col gap-5 mt-10 items-end font-semibold px-10 dark:text-white text-black">
          <li className="cursor-pointer">
            <a href="#sendEth">Send Eth</a>
          </li>
          <li className="cursor-pointer">
            <a href="#services">Services</a>
          </li>
          <li className="cursor-pointer">
            <a href="#transactions">Transactions</a>
          </li>
          <li className="cursor-pointer">
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
      </Drawer>
    </nav>
  );
};

export default Navbar;
