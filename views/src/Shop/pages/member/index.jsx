import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userAPI from "../../../api/userAPI";
import "./index.css";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import moment from "moment";
import exportInvoiceAPI from "../../../api/exportInvoiceAPI";
import detailExportInvoiceAPI from "../../../api/detailExportInvoiceAPI";
import { useSnackbar } from "notistack";
function Index() {
  const { enqueueSnackbar } = useSnackbar();
  const [member, setMember] = useState([]);
  const [money, setMoney] = useState();
  const [allOrder, setAllOrder] = useState([]);
  const [successOrser, setSuccessOrser] = useState([]);
  const [cancelOrder, setCancelOrder] = useState([]);
  const [refundOrder, setRefundOrder] = useState([]);
  const id_kh = useSelector((state) => state?.user?.current.dataUser[0]?.id_kh);
  const thanh_vien = useSelector(
    (state) => state?.user?.current.dataUser[0]?.thanh_vien
  );
  useEffect(() => {
    (async () => {
      try {
        const typeMember = await userAPI.getMember(id_kh);
        setMember(typeMember);
        const totalMoney = await userAPI.getSumMoneyUser(id_kh);
        setMoney(totalMoney[0]?.tongtien);
        const allOrder = await exportInvoiceAPI.getListExportInvoice(id_kh);
        for (let i = 0; i < allOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(
            allOrder[i].id_hdx
          );
          setAllOrder((test) => [...test, { HDX: allOrder[i], CTHDX: data }]);
        }

        const successOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Đã giao hàng",
        });
        for (let i = 0; i < successOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(
            successOrder[i].id_hdx
          );
          setSuccessOrser((test) => [
            ...test,
            { HDX: successOrder[i], CTHDX: data },
          ]);
        }

        const cancelOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Hủy",
        });
        for (let i = 0; i < cancelOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(
            cancelOrder[i].id_hdx
          );
          setCancelOrder((test) => [
            ...test,
            { HDX: cancelOrder[i], CTHDX: data },
          ]);
        }

        const refundOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Hoàn hàng",
        });
        for (let i = 0; i < refundOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(
            refundOrder[i].id_hdx
          );
          setRefundOrder((test) => [
            ...test,
            { HDX: refundOrder[i], CTHDX: data },
          ]);
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })();
  }, []);
  return (
    <div className="member">
      <div className="center">
        <div className="card">
          <div className="additional">
            <div className="user-card">
              <div className="level center">
                <EmojiEventsOutlinedIcon
                  sx={{
                    color:
                      thanh_vien === 1
                        ? "#E1E1E2"
                        : thanh_vien === 2
                        ? "yellow"
                        : thanh_vien === 2
                        ? "red"
                        : "brown",
                    width: "50px",
                    height: "50px",
                  }}
                />
              </div>
              <div className="points center">
                {new Intl.NumberFormat("it-IT", {
                  style: "currency",
                  currency: "VND",
                }).format(money)}
              </div>
            </div>
            <div className="more-info">
              <h1>{member[0]?.email_kh}</h1>
              <div className="coords">
                <span>Ngày tạo tài khoản</span>
                <span>Trạng thái tài khoản</span>
              </div>
              <div className="coords">
                <span>
                  {moment(member[0]?.ngay_tao_tk).format("DD/MM/YYYY")}
                </span>
                <span>
                  {member[0]?.trang_thai_kh === 0
                    ? "Đang hoạt động"
                    : "Tài khoản bị khóa"}
                </span>
              </div>
              <div className="stats">
                <div>
                  <div className="title">tat ca</div>
                  <i className="fa fa-trophy"></i>
                  <div className="value">{allOrder.length}</div>
                </div>
                <div>
                  <div className="title">thanh cong</div>
                  <i className="fa fa-gamepad"></i>
                  <div className="value">{successOrser.length}</div>
                </div>
                <div>
                  <div className="title">huy</div>
                  <i className="fa fa-group"></i>
                  <div className="value">{cancelOrder.length}</div>
                </div>
                <div>
                  <div className="title">hoanf</div>
                  <i className="fa fa-coffee"></i>
                  <div className="value infinity">{refundOrder.length}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="general">
            <h1>Jane Doe</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a
              volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut
              pulvinar.
            </p>
            <span className="more">Mouse over the card for more info</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
