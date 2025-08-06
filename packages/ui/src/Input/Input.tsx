import React from "react";
import { useBEM } from "@tectus/hooks";
import "./Input.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((
  props, 
  ref
) => {
  const { B } = useBEM('input');
  return (
    <input className={B()} ref={ref} {...props} autoComplete="off" />
  );
});

Input.displayName = 'Input';
