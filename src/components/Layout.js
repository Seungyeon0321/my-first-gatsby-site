import React from "react";
import AppHeader from "./AppHeader";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="container is-max-desktop">
      <AppHeader></AppHeader>
      {children}
      <Footer></Footer>
    </div>
  );
}
