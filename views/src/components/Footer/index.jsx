import React from "react";
import { BsInstagram, BsFacebook, BsGithub } from "react-icons/bs";
import "./index.css";
// import {FaTiktok} from "react-icons/fa";

function Footer() {
  return (
    <div className=" mt-10 p-6 text-white bg-white  opacity-90 shadow-md container ">
      <div className="flex gap-6 leading-8 h-[100%] justify-center items-center">
        <div className="w-[25 %]  ml-[10%] ">
          <span className="text-[30px] font-[900] bg-text-color bg-clip-text ">
            DShop
          </span>
          <div className="mt-6">
            <p>
              Trinh Khanh Duy <br /> B1809558 - Can Tho University <br /> All
              rights reserved.
            </p>
          </div>
        </div>
        <div className="w-[25%] text-center ">
          <p className="text-[25px] font-bold">Store</p>
          <div className="mt-6">
            <p>Portfolio</p>
            <p>About</p>
            <p>Contact</p>
            <p>Our Team</p>
          </div>
        </div>
        <div className="w-[25%] ">
          <p className="text-[25px] font-bold">Service</p>
          <div className="mt-6">
            <p>Introduce ShopShoes</p>
            <p>Ordering guide</p>
            <p>Return policy and warranty</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div className="w-[20%] ">
          <p className="text-[25px] font-bold">Social media</p>
          <div className="mt-6">
            <div className="mt-4 flex gap-4 items-center">
              <BsInstagram size={25} /> <p>@Khanh_Duy</p>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <BsFacebook size={25} /> <p>@Khanh_Duy</p>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <BsGithub size={25} /> <p>Khanh_Duy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
