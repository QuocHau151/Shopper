import Input from "@/components/Input";
import React, { useState } from "react";
import { useForm } from "../hooks/useForm";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { required, regexp, minMax } from "@/utils/validate";
import Button from "@/components/Button";
import { useAsync } from "../hooks/useAsync";
import { userService } from "../services/user.service";
import { validate } from "../utils/validate";
import { classNames } from "classnames";
import { message } from "antd";

export const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { excute: loginService, loading } = useAsync(login);
  const formLogin = useForm({
    username: [
      required("Vui lòng điền tài khoản"),
      regexp("email", "Xin vui lòng điền đúng định dạng Email"),
    ],
    password: [required("Xin vui lòng điền mật khẩu"), minMax(6, 32)],
  });
  const _onLogin = (e) => {
    e.preventDefault();

    if (formLogin.validate()) {
      loginService(formLogin.values);
    }
  };
  const { loading: resendEmailLoading, excute: resendEmailService } = useAsync(
    userService.resendEmail,
  );
  const { excute: signupService } = useAsync(userService.signup);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const { register, validate, values } = useForm({
    name: [
      required("Vui lòng điền tài khoản"),
      regexp("text", "Xin vui lòng điền đúng định dạng Email"),
    ],
    username: [
      required("Vui lòng điền tài khoản"),
      regexp("email", "Xin vui lòng điền đúng định dạng Email"),
    ],
    password: [required("Xin vui lòng điền mật khẩu"), minMax(6, 32)],
    confirmpassword: [required("Xin vui lòng điền mật khẩu"), minMax(6, 32)],
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    if (validate()) {
      try {
        await signupService(values);
        setIsSignupSuccess(true);
      } catch (err) {
        console.error(err);
        if (err.response?.data?.message) {
          message.error(err.response.data.message);
        }
      }
    }
  };

  const onResendEmail = async (ev) => {
    ev.preventDefault();
    try {
      await resendEmailService({
        username: values.username,
      });
      message.success("Email kích hoạt đã được gửi lại thành công");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        message.error(err.response.data.message);
      }
    }
  };
  console.log();
  return (
    <>
      {isSignupSuccess ? (
        <div className="container wrap flex flex-col text-center gap-10">
          <h1 className="text-2xl font-bold">Đăng ký tài khoản thành công</h1>
          <p>
            Vui lòng kiểm tra email để kích hoạt. Nếu bạn không nhận được email, vui lòng bấm{" "}
            <span className="font-bold">"Gửi lại email kích hoạt"</span> bên dưới
          </p>
          <div className="flex justify-center">
            <a
              onClick={onResendEmail}
              href="#"
              className={classNames("link flex gap-2", {
                "opacity-50 pointer-events-none": resendEmailLoading,
              })}>
              {resendEmailLoading && <LoadingOutlined />}
              Gửi lại email kích hoạt
            </a>
          </div>
        </div>
      ) : (
        <section className="py-12">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                {/* Card */}
                <div className="card card-lg mb-10 mb-md-0">
                  <div className="card-body">
                    {/* Heading */}
                    <h6 className="mb-7">Returning Customer</h6>
                    {/* Form */}
                    <form>
                      <div className="row">
                        <div className="col-12">
                          {/* Email */}
                          <div className="form-group">
                            <label className="sr-only" htmlFor="loginEmail">
                              Email Address *
                            </label>
                            <Input
                              {...formLogin.register("username")}
                              id="loginEmail"
                              type="email"
                              placeholder="Email Address *"
                            />
                            {/* <input
                          className="form-control form-control-sm"
                          id="loginEmail"
                          type="email"
                          placeholder="Email Address *"
                          required
                        /> */}
                          </div>
                        </div>
                        <div className="col-12">
                          {/* Password */}
                          <div className="form-group">
                            <label className="sr-only" htmlFor="loginPassword">
                              Password *
                            </label>
                            <Input
                              {...formLogin.register("password")}
                              id="loginPassword"
                              type="password"
                              placeholder="Password *"
                              required
                            />
                            {/* <input
                          className="form-control form-control-sm"
                          id="loginPassword"
                          type="password"
                          placeholder="Password *"
                          required
                        /> */}
                          </div>
                        </div>
                        <div className="col-12 col-md">
                          {/* Remember */}
                          <div className="form-group">
                            <div className="custom-control custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="loginRemember"
                                type="checkbox"
                              />
                              <label className="custom-control-label" htmlFor="loginRemember">
                                Remember me
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-auto">
                          {/* Link */}
                          <div className="form-group">
                            <a
                              className="font-size-sm text-reset"
                              data-toggle="modal"
                              href="#modalPasswordReset">
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                        <div className="col-12">
                          {/* Button */}
                          <Button
                            loading={loading}
                            onClick={_onLogin}
                            className="btn btn-sm btn-dark">
                            Signin
                          </Button>
                          {/* <a
                        href="./account-personal-info.html"
                        className="btn btn-sm btn-dark"
                        type="submit">
                        Sign In
                      </a> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                {/* Card */}
                <div className="card card-lg">
                  <div className="card-body">
                    {/* Heading */}
                    <h6 className="mb-7">New Customer</h6>
                    {/* Form */}
                    <form>
                      <div className="row">
                        <div className="col-12">
                          {/* Email */}
                          <div className="form-group">
                            <label className="sr-only" htmlFor="registerFirstName">
                              Full Name *
                            </label>
                            <Input {...register("name")} placeholder="Full Name *" />
                            {/* <input
                          className="form-control form-control-sm"
                          id="registerFirstName"
                          type="text"
                          placeholder="Full Name *"
                          required
                        /> */}
                          </div>
                        </div>
                        <div className="col-12">
                          {/* Email */}
                          <div className="form-group">
                            <label className="sr-only" htmlFor="registerEmail">
                              Email Address *
                            </label>
                            <Input {...register("username")} placeholder="Email Address *" />
                            {/* <input
                          className="form-control form-control-sm"
                          id="registerEmail"
                          type="email"
                          placeholder="Email Address *"
                          required
                        /> */}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          {/* Password */}
                          <div className="form-group">
                            <label className="sr-only" htmlFor="registerPassword">
                              Password *
                            </label>
                            <Input
                              {...register("password")}
                              placeholder="Password *"
                              type="password"
                            />
                            {/* <input
                          className="form-control form-control-sm"
                          id="registerPassword"
                          type="password"
                          placeholder="Password *"
                          required
                        /> */}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          {/* Password */}
                          <div className="form-group">
                            <label className="sr-only" htmlFor="registerPasswordConfirm">
                              Confirm Password *
                            </label>
                            <Input
                              {...register("confirmpassword")}
                              placeholder="Confirm Password *"
                              type="password"
                            />
                            {/* <input
                          className="form-control form-control-sm"
                          id="registerPasswordConfirm"
                          type="password"
                          placeholder="Confrm Password *"
                          required
                        /> */}
                          </div>
                        </div>
                        <div className="col-12 col-md-auto">
                          {/* Link */}
                          <div className="form-group font-size-sm text-muted">
                            By registering your details, you agree with our Terms &amp; Conditions,
                            and Privacy and Cookie Policy.
                          </div>
                        </div>
                        <div className="col-12 col-md">
                          {/* Newsletter */}
                          <div className="form-group">
                            <div className="custom-control custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="registerNewsletter"
                                type="checkbox"
                              />
                              <label className="custom-control-label" htmlFor="registerNewsletter">
                                Sign me up for the Newsletter!
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <Button
                            loading={loading}
                            onClick={onSubmit}
                            className="btn btn-sm btn-dark">
                            Register
                          </Button>
                          {/* Button */}
                          {/* <a
                        href="./account-personal-info.html"
                        className="btn btn-sm btn-dark"
                        type="submit">
                        Register
                      </a> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
