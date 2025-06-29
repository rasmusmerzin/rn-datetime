import React, { ReactNode } from "react";

interface Props {
  visible: boolean;
  children?: ReactNode;
}

export const Modal = ({ visible, children }: Props) => (
  <div style={{ display: visible ? undefined : "none" }}>{children}</div>
);
