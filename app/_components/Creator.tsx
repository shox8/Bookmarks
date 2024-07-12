"use client";
import React, { useState } from "react";
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

type Keys = {
  key: string;
  labelPlacement: "outside" | "inside" | "outside-left" | undefined;
};

const placement = "outside";

const keys: Keys = { key: placement, labelPlacement: placement };

const Creator = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, setState] = useState<Bookmark>({ title: "", url: "" });

  const create = () => {
    axios.post("/api/getLogo", { url: state.url }).then(({ data }) => {
      axios.post("/api/bookmarks", { ...state, url: data }).then(({ data }) => {
        console.log(data);
      });
    });
    onOpenChange();
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
                  {...keys}
                  label="Title"
                  value={state.title}
                  onChange={(e) =>
                    setState((p) => ({ ...p, title: e.target.value }))
                  }
                />
                <Input
                  {...keys}
                  label="Website Url"
                  value={state.url}
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
