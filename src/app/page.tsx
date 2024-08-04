"use client";
import SearchBox from "@/components/SearchBox";
import AnimeCard from "@/components/AnimeCard";
import { Grid, Container, Box } from "@radix-ui/themes";
import { useState } from "react";
import { searchAnime } from "@/hooks/searchAnime";
export enum PageStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  NOT_FOUND = "NOT_FOUND",
}
interface StateI {
  pageStatus : PageStatus
  query: string
}
export default function Home() {
  const [state, setState] = useState<StateI>({
    pageStatus: PageStatus.IDLE,
    query: "",
  });
  const { pageStatus, query } = state;
  const setQuery = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      query: value,
    }));
    
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value 
    setState((prevState) => ({
      ...prevState,
      query: value,
    }));
  };
  const setPageStatus = (value: PageStatus) => {
    setState((prevState) => ({
      ...prevState,
      pageStatus: value,
    }));
  }
  const onSubmit = async () => {
    if (query) {
      setPageStatus(PageStatus.LOADING);
      console.log(query);
    }
  };
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      searchAnime(query);
      console.log("add search function here")
    }
  }

  return (
    <main>
      <Grid my="5" >
      <SearchBox
        onSubmit={onSubmit}
        handleChange={handleOnChange}
        handleKeyPress={handleKeyPress}
        setQuery={setQuery}
        query={query}
      />
        <Grid my="5" gap= "5" columns="5"  rows="3">
        <AnimeCard />
        <AnimeCard />
        <AnimeCard />
        <AnimeCard />
        <AnimeCard />
        <AnimeCard />
        <AnimeCard />
        </Grid>
      </Grid>
    </main>
  );
}
