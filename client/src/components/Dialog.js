import React from "react";

export const openDialog = (id) => {
  document.getElementById(id).showModal();
};
export const closeDialog = (id) => {
  document.getElementById(id).close();
};

export function Dialog({ id, title, children }) {
  return (
    <dialog id={id}>
      <button className="close"onClick={() => closeDialog(id)}>X</button>
      <div style={{ width: "98%", height: "auto" }}>
        <h1>{title}</h1>
        {children}
      </div>
    </dialog>
  );
}
