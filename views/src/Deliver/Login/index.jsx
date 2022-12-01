import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import employeeAPI from "../../api/employeeAPI";
import { login } from "../../redux/employeeSlice";
import { useSnackbar } from "notistack";
import FormLogin from "./FormLogin";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id_cv = useSelector((state) => state.employee?.currentDeliver[0]?.id_cv);
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = {
    email: "",
    password: "",
  };
  useEffect(() => {
    if (id_cv === "CV04") {
      navigate("/deliver/dashbroad");
    } else {
      navigate("/deliver/login");
    }
  }, [id_cv]);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });
  const setData = async (data) => {
    try {
      if (data.email && data.password) {
        const res = await employeeAPI.login({
          email: data.email,
          password: data.password,
        });
        if (res.length !== 0) {
          if (res[0].id_cv === "CV04") {
            unwrapResult(
              dispatch(
                login({
                  email: data.email,
                  password: data.password,
                })
              )
            );
            navigate("/deliver/dashbroad");
            enqueueSnackbar("Đăng nhập thành công", {
              variant: "success",
              autoHideDuration: 2000,
            });
          } else {
            enqueueSnackbar("Tài khoản hoặc mật khẩu không đúng", {
              variant: "error",
              autoHideDuration: 2000,
            });
          }
        } else {
          enqueueSnackbar("Tài khoản hoặc mật khẩu không đúng", {
            variant: "error",
            autoHideDuration: 2000,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div >
      <div className="text-[35px] font-[900] text-center text-blue-500 bg-text-color bg-clip-text mt-[10%]">
        GIAO HÀNG
      </div>
      <div className="absolute  top-[55%] left-2/4 -translate-x-2/4 -translate-y-2/4 w-[90%] max-w-[500px]  bg-[#F1F5F9] rounded-xl shadow-lg p-10 border-2 ">
        <p className="text-[35px] font-bold text-center">ĐĂNG NHẬP</p>
        <form onSubmit={handleSubmit((data) => setData(data))}>
          <FormLogin control={control} errors={errors} />
          <button className="w-full opacity-80 text-white font-bold mt-8 py-2 bg-lime-600 rounded-xl hover:opacity-100 duration-300 ">
            ĐĂNG NHẬP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
