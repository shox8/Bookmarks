"use client";
import React, { useEffect, useState } from "react";
import Creator from "./_components/Creator";
import axios from "axios";
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
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { TbBookmarksFilled } from "react-icons/tb";
import { Bookmark } from "./types";
import { motion } from "framer-motion";
import "./page.scss";

const Home = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/bookmarks").then(({ data }) => {
      setBookmarks(data);
      setLoading(false);
    });
  }, []);

  return (
    <NextUIProvider className="mainBlock">
      <header className="flex p-4 items-center justify-between">
        <div className="flex gap-2">
          <TbBookmarksFilled className="text-2xl" />
          <text>Bookmarks</text>
        </div>
        <Input
          placeholder="Search"
          startContent={<IoSearch />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[250px]"
        />
        <Creator setBookmarks={setBookmarks} />
      </header>
      <motion.div layout className="bookmarks">
        {loading ? (
          <Spinner color="warning" size="lg" />
        ) : (
          bookmarks
            .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
            .map((item: Bookmark, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={index}
                layout
              >
                <Card
                  isPressable
                  className="card"
                  onPress={() =>
                    open(
                      item.url.includes("https://")
                        ? item.url
                        : "https://" + item.url,
                      "_blank"
                    )
                  }
                >
                  <CardBody className="overflow-visible p-0 flex">
                    <div className="flex items-center gap-2 justify-center my-4">
                      <Avatar size="md" src={item.icon} className="p-2" />
                      <Tooltip content={item.title} color="warning">
                        <text>{item.title}</text>
                      </Tooltip>
                    </div>
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          className="w-full"
                          color="warning"
                          variant="flat"
                        >
                          Actions
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
              </motion.div>
            ))
        )}
      </motion.div>
    </NextUIProvider>
  );
};

export default Home;
