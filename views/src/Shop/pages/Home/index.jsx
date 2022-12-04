import React, { useEffect, useState } from "react";
import productAPI from "../../../api/productAPI";
import Banner from "../../../components/Banner";
import Card from "../../../components/Card";
import Footer from "../../../components/Footer";
import "./index.css";
import ReactPaginate from "react-paginate";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Button from "@mui/material/Button";

function Home() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [currentItem, setCurrentItem] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [offset, setOffer] = useState(0);

  const [currentItem2, setCurrentItem2] = useState([]);
  const [pagecount2, setpagecount2] = useState(0);
  const [offset2, setOffer2] = useState(0);
  const itempage = 10;
  const itempagedis = 10;

  const [newProduct, setNewProduct] = useState([]);
  const [discountProduct, setDiscountProduct] = useState([]);
  useEffect(() => {
    (async () => {
      const resNewProduct = await productAPI.getNewProduct();
      const resDiscountProduct = await productAPI.getDiscountProduct();
      const endoffset = offset + itempage;
      setCurrentItem(resNewProduct.slice(offset, endoffset));
      setpagecount(Math.ceil(resNewProduct.length / itempage));
      const endoffset2 = offset2 + itempagedis;
      setCurrentItem2(resDiscountProduct.slice(offset2, endoffset2));
      setpagecount2(Math.ceil(resDiscountProduct.length / itempagedis));
      setNewProduct(resNewProduct);
      setDiscountProduct(resDiscountProduct);
    })();
  }, [offset, itempage,itempagedis,offset2]);
  const handdlechangeOpen = () => {
    setOpen((pre) => !pre);
  };
  const handlechange2 = () => {
  
    setOpen2((pre) => !pre);


  };
  const handdlechuyen = (e) => {
    const newOffset = (e.selected * itempage) % newProduct.length;
    setOffer(newOffset);
  };
  const handdlechuyen2 = (e) => {
    const newOffset = (e.selected * itempagedis) % discountProduct.length;
    setOffer2(newOffset);
  };
  return (
    <div>
      <Banner  />
      {open ? (
        <div className="w-[80%] mx-auto mt-20">
          <div className="w-[50px] h-[30px] card translate-x-[-1000px]  "></div>
          <Button variant="outlined" onClick={handdlechangeOpen}>
            <ArrowCircleRightIcon />
          </Button>
          <p className="my-2 text-[24px] text-center text-teal-700 font-bold  uppercase">
            Sản phẩm mới
          </p>

          <div className="grid grid-cols-5 gap-10">
            {currentItem?.map((data, idx) => (
              <Card key={idx} data={data} />
            ))}
          </div>
          <ReactPaginate
            containerClassName={"btncontainer"}
            breakLabel="..."
            nextLabel="Tiếp >"
            onPageChange={handdlechuyen}
            pageRangeDisplayed={3}
            pageCount={pagecount}
            previousLabel="< Trước"
            renderOnZeroPageCount={null}
            activeClassName={"paginationActive"}
          />
        </div>
      ) : (
        <div className="pl-20 pr-20 mt-14">
          <div
            className="card w-[100%] h-[70vh] "
            onClick={handdlechangeOpen}
          ></div>
        </div>
      )}

      {open2 ? (
        <div  className=" w-[80%] mx-auto mt-20  ">
          <div className="w-[50px] h-[30px] card2 translate-x-[-1000px] "></div>
          <Button variant="outlined" onClick={handlechange2}>
            <ArrowCircleRightIcon />
          </Button>
          <p className="my-2 text-[24px] text-center text-teal-700 font-bold  uppercase">
            Sản phẩm khuyến mãi
          </p>

          <div className="grid grid-cols-5 gap-10">
            {currentItem2?.map((data, idx) => (
              <Card key={idx} data={data} />
            ))}
          </div>
          <ReactPaginate
            containerClassName={"btncontainer"}
            breakLabel="..."
            nextLabel="Tiếp >"
            onPageChange={handdlechuyen2}
            pageRangeDisplayed={3}
            pageCount={pagecount2}
            previousLabel="< Trước"
            renderOnZeroPageCount={null}
            activeClassName={"paginationActive"}
          />
        </div>
      ) : (
        <div id="iditem" className="pl-20 pr-20 mt-14">
          <div
            className="card2 w-[100%] h-[70vh] "
            onClick={handlechange2}
          ></div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
