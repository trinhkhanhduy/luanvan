import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userAPI from "../../../api/userAPI";
import "./index.css";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import moment from "moment";
function Index() {
  const [member, setMember] = useState([]);
  const id_kh = useSelector((state) => state?.user?.current.dataUser[0]?.id_kh);
  useEffect(() => {
    (async () => {
      const typeMember = await userAPI.getMember(id_kh);
      setMember(typeMember);
    })();
  }, []);
  return (
    <div className="member">
      <div className="center">
        <div className="card">
          <div className="additional">
            <div className="user-card">
              <div className="level center"><EmojiEventsOutlinedIcon sx={{color:"yellow", width:"50px",height:"50px"}}/></div>
              <div className="points center">5,312 Points</div>
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
                  <div className="title">Awards</div>
                  <i className="fa fa-trophy"></i>
                  <div className="value">2</div>
                </div>
                <div>
                  <div className="title">Matches</div>
                  <i className="fa fa-gamepad"></i>
                  <div className="value">27</div>
                </div>
                <div>
                  <div className="title">Pals</div>
                  <i className="fa fa-group"></i>
                  <div className="value">123</div>
                </div>
                <div>
                  <div className="title">Coffee</div>
                  <i className="fa fa-coffee"></i>
                  <div className="value infinity">∞</div>
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
