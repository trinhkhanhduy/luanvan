import React, { useState } from "react";
import "./style.css";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect } from "react";
import bannerApi from "../../api/bannerAPI";
import { Link } from "react-router-dom";
import filterAPI from "../../api/filterAPI";
import { addListProduct } from "../../redux/productSlice";
import { useDispatch } from "react-redux";

function Banner(props) {
  const dispatch = useDispatch();
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await bannerApi.getBanner();
      setBanner(res);
    })();
  }, []);
  const responsive = {
    0: { items: 1 },
  };

  const fillterBrand = async (id_th) => {
    if (id_th === null) {
      return;
    } else {
      const dataFilter = await filterAPI.sortBrand(id_th);
      dispatch(addListProduct(dataFilter));
    }
  };

  return (
    <div className="p-7 ">
      <AliceCarousel
        mouseTracking
        items={banner.map((item, index) => {
          return (
            <div
              className="flex justify-center z-10"
              data-value={index}
              key={index}
            >
              <Link to={item.loaiab === null ? "" : item.loaiab} className="border-2">
                <img
                  className="w-[100%] shadow-[0px_5px_15px_rgba(0,0,0,0.35)] cursor-pointer border-2 "
                  src={item.ten_ab.slice(12, item.ten_ab.length)}
                  alt="hinh anh"
                  onClick={() => fillterBrand(item?.id_th)}
                />
              </Link>
            </div>
          );
        })}
        responsive={responsive}
        controlsStrategy="alternate"
        autoPlay
        infinite
        autoPlayInterval={5000}
        disableDotsControls={true}
        renderPrevButton={() => {
          return (
            <p className="p-4  ">
              <ArrowForwardIosIcon
                className="btnnext"
                sx={{
                  width: "50px",
                  height: "35px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "#60A5FA",
                }}
              />
            </p>
          );
        }}
        renderNextButton={() => {
          return (
            <p className="p-4 ">
              <ArrowBackIosNewIcon
                className="btnnext"
                sx={{
                  width: "50px",
                  height: "35px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "#60A5FA",
                
              
                }}
              />
            </p>
          );
        }}
      />
    </div>
  );
}

export default Banner;
