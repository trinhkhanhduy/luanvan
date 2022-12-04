import React, { useEffect, useRef, useState } from "react";

import brandAPI from "../../../api/brandAPI";
import sizeAPI from "../../../api/sizeAPI";
import filterAPI from "../../../api/filterAPI";

import Card from "../../../components/Card";
import Footer from "../../../components/Footer";
import { addListProduct, product } from "../../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@mui/material/Slider";
import productAPI from "../../../api/productAPI";
import { unwrapResult } from "@reduxjs/toolkit";

function Products() {
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);
  const [checked, setCheck] = useState([]);
  const [checkedBrand, setCheckBrand] = useState([]);

  const dispatch = useDispatch();

  const dataProduct = useSelector((state) => state?.product?.productlist);
  // const isMout = useRef(true);
  useEffect(() => {
    (async () => {
      // unwrapResult(dispatch(product()));
      const brand = await brandAPI.getList();
      const size = await sizeAPI.getList();
      // if (isMout.current) {
        setSize(size);
        setBrand(brand);
      // }

      if (checked.length !== 0) {
        if (checkedBrand.length !== 0) {
          const dataSize = await filterAPI.sortSizeBrand({
            check: checked,
            brand: checkedBrand,
          });
          dispatch(addListProduct(dataSize));
        } else {
          const dataSize = await filterAPI.sortSize({ check: checked });
          dispatch(addListProduct(dataSize));
        }
      }
 
    })();
    // return () => {
    //   isMout.current = false;
    // };
  }, [checked]);
  const filterSort = async (data) => {
    const dataFilter = await filterAPI.sortBy(data);
    dispatch(addListProduct(dataFilter));
  };

  const filterBrand = async (data) => {
    const dataFilter = await filterAPI.sortBrand(data);
    dispatch(addListProduct(dataFilter));
    setCheckBrand(data);
  };

  const [value, setValue] = useState([500000, 1500000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handCheck = (id) => {
    setCheck((pre) => {
      const isCheck = checked.includes(id);
      if (isCheck) {
        return checked.filter((item) => item !== id);
      } else {
        return [...pre, id];
      }
    });
  };

  const FilterRangePrice = async () => {
    const res = await filterAPI.rangePrice(value);
    dispatch(addListProduct(res));
  };
  var count = 8;
  const viewAddProduct = async () => {
    count += 8;
    const res = await productAPI.getProductList({
      number: count,
    });

    dispatch(addListProduct(res));
  };

  return (
    <div>
      <div className="w-[100%] min-h-[50vh] ">
        <div className="flex gap-5 w-[80%] mx-auto mt-10">
          <div className="w-[20%]">
            <div className="mb-5">
              <select
                onChange={(e) => filterSort(e.target.value)}
                className="w-full py-[6px] px-4 bg-gray-200 outline-none rounded-lg shadow-md"
              >
                <option value="">Sắp xếp giá</option>
                <option value="ASC">Từ thấp đến cao</option>
                <option value="DESC">Từ cao đến thấp</option>
              </select>
            </div>
            <div className="mb-5">
              <select
                onChange={(e) => filterBrand(e.target.value)}
                className="w-full py-[6px] px-4 bg-gray-200 outline-none rounded-lg shadow-md"
              >
                <option value="">Thương hiệu</option>
                {brand?.map(({ id_th, ten_th }, idx) => (
                  <option key={idx} value={id_th}>
                    {ten_th}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <div className="w-full py-[6px] px-4 bg-gray-200 outline-none rounded-lg shadow-md">
                Kích Thước
              </div>
              <div className="w-full mt-2 h-[100%] rounded-lg border-2 border-gray-400 flex gap-3 py-1 px-2 flex-wrap ">
                {size.map((item, index) => {
                  return (
                    <div key={index} className="flex">
                      <input
                        type="checkbox"
                        checked={checked.includes(item.id_kt)}
                        onChange={() => handCheck(item.id_kt)}
                      />
                      <p className="ml-2">{item.ten_kt}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-5 p-4 bg-slate-100 rounded-md">
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                max={3000000}
              />
              <div className="flex justify-between">
                <p>
                  {" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(value[0])}
                </p>
                <p>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(value[1])}
                </p>
              </div>
              <button
                onClick={FilterRangePrice}
                className="block ml-auto mr-0 py-2 px-4 mt-2 text-white font-medium bg-green-500 rounded-md"
              >
                Lọc
              </button>
            </div>
          </div>
          <div className="w-[80%] min-h-[53vh] mx-auto ">
            <div className="grid grid-cols-4 gap-5">
              {dataProduct?.map((data, idx) => (
                <Card key={idx} data={data} />
              ))}
            </div>
            <p
              onClick={viewAddProduct}
              className="text-center text-[18px] text-slate-700 mt-5 cursor-pointer"
            >
              Xem thêm
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Products;
