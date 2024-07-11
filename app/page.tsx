import React from "react";
import Creator from "./_components/Creator";
import { NextUIProvider } from "@nextui-org/react";

const Home = () => {
  return (
    <NextUIProvider>
      <Creator />
    </NextUIProvider>
  );
};

export default Home;
