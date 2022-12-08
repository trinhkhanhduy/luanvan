import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import moment from "moment";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import payOnlineAPI from "../../../api/payOnlineAPI";
import { useDispatch, useSelector } from "react-redux";
import exportInvoiceAPI from "../../../api/exportInvoiceAPI";
import detailExportInvoiceAPI from "../../../api/detailExportInvoiceAPI";
import { useNavigate } from "react-router-dom";
import { removeAllCart } from "../../../redux/cartSlide";
import detailProductAPI from "../../../api/detailProductAPI";
import userAPI from "../../../api/userAPI";

function CheckPay() {
  const url = window.location.search;
  const param = Object.fromEntries(new URLSearchParams(url));
  const [money, setMoney] = useState("");
  const listBuy = useSelector((state) => state?.listbuy?.list);
  const id_kh = useSelector((state) => state?.user?.current.dataUser[0]?.id_kh);
  const dia_chi = useSelector((state) => state?.address?.addresslist[0]);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const a = await payOnlineAPI.vnpay_ipn(param);
        const totalMoney = await userAPI.getSumMoneyUser(id_kh);
        setMoney(totalMoney[0]?.tongtien);
        if (a.RspCode === "00") {
          const id_hdx = await exportInvoiceAPI.createExportInvoice({
            tenkh: dia_chi.ten_kh,
            sdtkh: dia_chi.sdt_kh,
            tongtienhdx:
              param.vnp_Amount / 100 > 1000000
                ? param.vnp_Amount / 100
                : param.vnp_Amount / 100 + 30000,
            ngaylaphdx: moment().format("YYYY-MM-DD"),
            trangthai: "Đang xử lý",
            hinhthuctt: "online",
            tienvc: param.vnp_Amount / 100 > 1000000 ? 0 : 30000,
            idkh: id_kh,
            diachi: dia_chi.dia_chi_kh,
          });

          await detailExportInvoiceAPI.createdetailExportInvoice({
            idhdx: id_hdx[0].id_hdx,
            products: listBuy,
          });
          await detailProductAPI.removeProduct(listBuy);

          if (listBuy[0].type === "cart") {
            dispatch(removeAllCart());
          }

          dispatch(removeAllCart());
          setTimeout(() => {
            navigation("/shop/orders");
          }, 2000);
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listBuy]);
  const typeMember =
    param.vnp_Amount / 100 > 1000000
      ? param.vnp_Amount / 100
      : param.vnp_Amount / 100 + 30000 + money >= 10000000 &&
        param.vnp_Amount / 100 > 1000000
      ? param.vnp_Amount / 100
      : param.vnp_Amount / 100 + 30000 + money < 30000000
      ? 1
      : param.vnp_Amount / 100 > 1000000
      ? param.vnp_Amount / 100
      : param.vnp_Amount / 100 + 30000 + money >= 30000000 &&
        param.vnp_Amount / 100 > 1000000
      ? param.vnp_Amount / 100
      : param.vnp_Amount / 100 + 30000 + money < 50000000
      ? 2
      : param.vnp_Amount / 100 > 1000000
      ? param.vnp_Amount / 100
      : param.vnp_Amount / 100 + 30000 + money >= 50000000
      ? 3
      : 0;
  return (
    <div>
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ">
        <Stack sx={{ color: "grey.500" }}>
          <CircularProgress color="success" />
        </Stack>
      </div>
    </div>
  );
}

export default CheckPay;
