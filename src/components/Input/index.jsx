import React from "react";
import { ErrorText, InputStyle } from "./style";
import classNames from "classnames";
export default function Input({ className, error, type = "text", ...props }) {
  return (
    <InputStyle className={classNames(className, { error })}>
      <input className="form-control form-control-sm " {...props} type={type} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputStyle>
  );
}
