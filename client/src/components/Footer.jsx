import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10" id="contact">
      <div className="flex justify-center md:justify-between">
        <div className="flex gap-4 justify-center items-center">
          <img src="/images/metamask.svg" alt="footer_logo" className="w-8" />
          <span className="font-bold text-lg">KRYPT</span>
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
        </ul>
      </div>
      <div className="text-center py-5">
        <h5 className="text-sm">Come join us</h5>
        <p>krypt@crypto.com</p>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 m-auto"></div>
      <div className="text-center pt-5 flex justify-between">
        <h5 className="text-sm">@krypt 2022</h5>
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
