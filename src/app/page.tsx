"use client";
import SearchBox from "@/components/SearchBox";
import AnimeCard from "@/components/AnimeCard";
import { Grid, Flex, Button, Text } from "@radix-ui/themes";
import { useState } from "react";
import { searchAnime } from "@/hooks/searchAnime";
import { Media, PageInfo } from "@/types/types";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";

enum PageStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  NOT_FOUND = "NOT_FOUND",
}

interface StateI {
  pageStatus: PageStatus;
  query: string;
  animes: Media[] | [];
  pageInfo: PageInfo | {};
  errorMessage: string;
}
export default function Home() {
  const [state, setState] = useState<StateI>({
    pageStatus: PageStatus.IDLE,
    query: "",
    animes: [],
    pageInfo: {},
    errorMessage: "",
  });
  const router = useRouter();
  const { pageStatus, query, animes, pageInfo } = state;
  const setQuery = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      query: value,
    }));
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
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
  };
  const onSubmit = async () => {
    if (query) {
      setPageStatus(PageStatus.LOADING);
      console.log(query);
    }
  };

  const checkIsFav = (animes: Media[]) => {
    return animes.map((anime) => {
      if (localStorage.getItem(anime.id.toString())) {
        return { ...anime, isFaved: true };
      } else {
        return { ...anime, isFaved: false };
      }
    });
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setPageStatus(PageStatus.LOADING);
      const data = await searchAnime(query);
      if (data.errors) {
        setState({ ...state, pageStatus: PageStatus.ERROR });
      } else {
        const syncData = checkIsFav(data.Page.media)
        setState((prevState) => ({
          ...prevState,
          pageStatus: PageStatus.SUCCESS,
          animes: syncData,
          pageInfo: data?.Page?.pageInfo,
        }));
      }
    }
  };
  const setFavedAnime = (id: number) => {
    const updatedList = animes.map((anime) => {
      if (anime.id === id) {
        return { ...anime, isFaved: anime.isFaved ? false : true };
      }
      return anime;
    });
    setState({ ...state, animes: updatedList });
  };
  return (
    <main>
      <Grid my="5">
        <SearchBox
          onSubmit={onSubmit}
          handleChange={handleOnChange}
          handleKeyPress={handleKeyPress}
          setQuery={setQuery}
          query={query}
        />

        <Flex mt="4">
          <Button
            size="1"
            onClick={() => {
              router.push(routes.favorites);
            }}
          >
            Go to my favorites <HeartFilledIcon />
          </Button>
        </Flex>
        {pageStatus === PageStatus.IDLE && (
          <Grid justify="center" align="center" mt="5">
            <Text align="center">Search an Anime!</Text>
          </Grid>
        )}
        {pageStatus === PageStatus.ERROR && (
          <Grid justify="center" align="center">
            <Text>An Error has occured</Text>
          </Grid>
        )}
        {pageStatus === PageStatus.SUCCESS && (
          <Grid
            my="5"
            gap="2"
            columns={{ xl: "5", lg: "4", md: "2", sm: "2", xs: "2" }}
          >
            {animes.map((anime: Media) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                setFavedAnime={setFavedAnime}
                isFavoriteCard={false}
              />
            ))}
          </Grid>
        )}
      </Grid>
    </main>
  );
}
