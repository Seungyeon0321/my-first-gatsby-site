import { Link } from "gatsby";
import React from "react";
import * as classes from "./Header.module.scss";

export default function Header() {
  return (
    <>
      <h1 className={classes.home}>I am Header</h1>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/blogs">Blogs</Link>
      <Link to="/blogs">Blogs</Link>
    </>
  );
}
