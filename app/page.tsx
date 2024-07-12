"use client";
import React, { useEffect, useState } from "react";
import Creator from "./_components/Creator";
import axios from "axios";
import { Input, NextUIProvider } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { TbBookmarksFilled } from "react-icons/tb";
import { Bookmark } from "./types";
import "./page.scss";

const Home = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    axios.get("/api/bookmarks").then(({ data }) => {
      setBookmarks(data);
    });
  }, []);

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
        <Creator setBookmarks={setBookmarks} />
      </header>
      <div className="bookmarks">
        {bookmarks.map((item, index) => (
          <div key={index}>{item.title}</div>
        ))}
      </div>
    </NextUIProvider>
  );
};

export default Home;
