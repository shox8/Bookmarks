import React from "react";
import Creator from "./_components/Creator";
import { Input, NextUIProvider } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { TbBookmarksFilled } from "react-icons/tb";
import "./page.scss";

const Home = () => {
  return (
    <NextUIProvider>
      <header className="flex p-4 items-center justify-between">
        <div className="flex gap-2">
          <TbBookmarksFilled className="text-2xl" />
          <text>Bookmarks</text>
        </div>
        <Input
          placeholder="Search"
          startContent={<IoSearch />}
          className="w-[250px]"
        />
        <Creator />
      </header>
      <div className="bookmarks"></div>
    </NextUIProvider>
  );
};

export default Home;
