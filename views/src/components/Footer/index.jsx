import React from "react";
import { BsInstagram, BsFacebook } from "react-icons/bs";
import "./index.css";
// import {FaTiktok} from "react-icons/fa";

function Footer() {
  return (
    <div className=" mt-10 p-6 text-white bg-slate-700  opacity-90 shadow-md container">
      <div className="flex gap-6 leading-8 h-[100%] justify-center items-center">
        <div className="w-[25%]  ml-[10%]  ">
          <span className="text-[30px] font-[900] bg-text-color bg-clip-text  ">
            DShop
          </span>
          <div className="mt-6">
            <p>
              Trinh Khanh Duy <br /> B1809558 - Can Tho University <br /> Đã đăng ký Bản quyền.
            </p>
          </div>
        </div>
        <div className="w-[25%] text-center ">
          <p className="text-[25px] font-bold">Cửa hàng</p>
          <div className="mt-6">
            <p>Thông tin</p>
            <p>Giới thiệu</p>
            <p>Liên hệ</p>
            <p>Về chúng tôi</p>
          </div>
        </div>
        <div className="w-[25%]  ">
          <p className="text-[25px] font-bold">Dịch vụ</p>
          <div className="mt-6">
            <p>Chính sách</p>
            <p>Cam kết và bảo hành</p>
            <p>Điều khoản</p>
            <p>Bảo mật</p>
          </div>
        </div>
        <div className="w-[20%] ">
          <p className="text-[25px] font-bold">Mạng xã hội</p>
          <div className="mt-6">
            <div className="mt-4 flex gap-4 items-center">
              <BsInstagram size={25} /> <p>@Khanh_Duy</p>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <BsFacebook size={25} /> <p>@Khanh_Duy</p>
            </div>
            {/* <div className="mt-4 flex gap-4 items-center">
              <BsGithub size={25} /> <p>Khanh_Duy</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
