"use client";
import { useEffect, useState } from "react";
import { Media } from "@/types/types";
import AnimeCard from "@/components/AnimeCard";
import { Text, Grid, Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
interface StateI {
  animes: Media[] | [];
}
const FavsPage = () => {
const router = useRouter();
  const [state, setState] = useState<StateI>({ animes: [] });
  useEffect(() => {
    const items = { ...localStorage };
    console.log(items);
    let newItems = [];
    for (const key in items) {
      if (key !== "ally-supports-cache") {
        newItems.push(JSON.parse(items[key]));
      }
    }
    setState((prevState) => ({ ...prevState, animes: newItems }));
  }, []);
  return (
    <>
    <Button title="Go Back"onClick={() => {router.back()}}variant="soft" size="2" >
        <ArrowLeftIcon/>
    </Button>
    <Text as="h1">
        My Favorites
    </Text>
    <Grid
            my="5"
            gap="2"
            columns={{ xl: "5", lg: "4", md: "2", sm: "2", xs: "2" }}
          >
      {state.animes.map((anime: Media) => (
          <AnimeCard key={anime.id} anime={anime} setFavedAnime={() => {}} isFavoriteCard/>
        ))}
        </Grid>
    </>
  );
};

export default FavsPage;
