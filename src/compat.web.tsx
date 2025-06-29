import React, { ReactNode, useMemo } from "react";

interface Props {
  visible: boolean;
  children?: ReactNode;
}

export const Modal = ({ visible, children }: Props) => {
  const style = useMemo(
    () =>
      ({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: visible ? undefined : "none",
        userSelect: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 300ms",
      }) satisfies React.CSSProperties,
    [visible],
  );
  return <div style={style}>{children}</div>;
};
