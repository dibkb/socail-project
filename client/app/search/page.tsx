"use client";
import Loading from "@/components/guides/loading";
import { Globallayout } from "@/components/layouts/main";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useState } from "react";
export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [notTyping, setNotTyping] = useState<boolean>(false);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedValue(inputValue);
      setNotTyping(true);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
      setNotTyping(false);
    };
  }, [inputValue]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <Globallayout>
      <Input
        type="text"
        placeholder="Search users"
        className="p-8 rounded-xl text-sm"
        onChange={handleChange}
        value={inputValue}
      />
      <div className="mt-4">{notTyping ? <div>Content</div> : <Loading />}</div>
    </Globallayout>
  );
}
