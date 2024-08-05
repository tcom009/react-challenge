"use client"; 
import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
interface PropsI {
  query?: string;
  setQuery?: (query: string) => void;
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onSubmit?: () => void;
}
export default function SearchBox({
  handleChange,
  handleKeyPress,
  onSubmit,
}: PropsI) {


  return (
    <TextField.Root placeholder="Search an Anime" onChange={handleChange} onSubmit={onSubmit} onKeyPress={handleKeyPress}>
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
}
