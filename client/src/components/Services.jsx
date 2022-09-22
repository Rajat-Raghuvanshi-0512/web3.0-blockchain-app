import React from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";

const ServiceCard = ({ color, icon, title, subtitle }) => {
  return (
    <div className="card grid grid-cols-5 justify-start items-center white-glassmorphism m-3 px-2 py-5">
      <div
        className={`w-10 h-10 rounded-full flex justify-center items-center m-auto ${color} `}
      >
        {icon}
      </div>
      <div className="flex flex-col col-span-4">
        <h5 className="text-2xl font-bold font-serif mb-2">{title}</h5>
        <p className="text-md">{subtitle}</p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div
      className="flex flex-col md:flex-row justify-between gap-20 my-20 "
      id="services"
    >
      <div className="flex flex-col justify-center items-center md:items-start flex-1">
        <h2 className="text-3xl sm:text-5xl text-gradient">
          Services that we <br /> continue to improve
        </h2>
        <p className="my-5">
          The best choice for buying and selling your crypto assets, with the
          various super friendly services we offer
        </p>
      </div>
      <div className="flex flex-col flex-1">
        <ServiceCard
          color="bg-[#2952E3]"
          title={"Security gurantee"}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
          icon={<MdOutlineSecurity className="w-6 h-6 " />}
        />
        <ServiceCard
          color="bg-[#89845F]"
          title={"Best exchange rates"}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
          icon={<FaSearch className="w-5 h-5 " />}
        />
        <ServiceCard
          color="bg-[#F84550]"
          title={"Fastest Transactions"}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
          icon={<FaHeart className="w-5 h-5" />}
        />
      </div>
    </div>
  );
};

export default Services;
