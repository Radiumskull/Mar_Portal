import React from "react";
import HomePublic from "./HomePublic";
import HomePrivate from "./HomePrivate";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  return <div>{user ? <HomePrivate /> : <HomePublic />}</div>;
};

export default Home;
