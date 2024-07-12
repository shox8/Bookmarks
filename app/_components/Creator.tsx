"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { HiOutlinePlus } from "react-icons/hi";
import { Bookmark } from "../types";
import axios from "axios";

const item = { title: "", url: "" };

const Creator = ({
  setBookmarks,
}: {
  setBookmarks: Dispatch<SetStateAction<any>>;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, setState] = useState<Bookmark>(item);
  const [loading, setLoading] = useState<boolean>(false);

  const create = () => {
    setLoading(true);
    axios.post("/api/getLogo", { url: state.url }).then(({ data }) => {
      axios
        .post("/api/bookmarks", { ...state, url: data })
        .then(({ data }: { data: Bookmark }) => {
          onOpenChange();
          setLoading(false);
          setState(item);
          setBookmarks((p: Bookmark[]) => [...p, data]);
        });
    });
  };

  return (
    <>
      <Button onClick={onOpenChange} startContent={<HiOutlinePlus />}>
        New
      </Button>
      <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create new bookmark
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Title"
                  value={state.title}
                  labelPlacement="outside"
                  onChange={(e) =>
                    setState((p) => ({ ...p, title: e.target.value }))
                  }
                />
                <Input
                  label="Website Url"
                  value={state.url}
                  labelPlacement="outside"
                  onChange={(e) =>
                    setState((p) => ({ ...p, url: e.target.value }))
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={create}
                  isLoading={loading}
                  isDisabled={state.title === "" || state.url === ""}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Creator;
