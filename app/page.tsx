"use client";
import React, { useEffect, useState } from "react";
import Creator from "./_components/Creator";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  NextUIProvider,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
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
          <Card
            key={index}
            isPressable
            className="bg-background/60 card"
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0 flex">
              <div className="flex items-center gap-2 justify-center">
                <Avatar size="md" src={item.url} className="my-2 p-2  " />
                <text>{item.title}</text>
              </div>
            </CardBody>
            <CardFooter className="text-small justify-between">
              <Dropdown>
                <DropdownTrigger>
                  <Button className="w-full" color="warning" variant="flat">
                    <BsThreeDots />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="edit">Edit</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardFooter>
          </Card>
        ))}
      </div>
    </NextUIProvider>
  );
};

export default Home;
