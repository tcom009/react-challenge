import { HeartFilledIcon, HeartIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Avatar, Text, Box } from "@radix-ui/themes";
import { Media } from "@/types/types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
interface PropsI {
  anime: Media;
  setFavedAnime: (id: number) => void;
  isFavoriteCard: boolean;
}
const AnimeCard = ({ anime, setFavedAnime, isFavoriteCard }: PropsI) => {
  const { title, coverImage } = anime;
  const shortenText = (text: string) =>
    text.length > 39 ? `${text.slice(0, 40)}...` : text;
  const addToFavs = () => {
    if (!isFaved()) {
      localStorage.setItem(anime.id.toString(), JSON.stringify(anime));
      setFavedAnime(anime.id);
    }
  };
  const isFaved = () => {
    const item = localStorage.getItem(anime.id.toString());
    if (item) {
      return true;
    } else {
      return false;
    }
  };
  const removeFromFavs = () => {
    if (isFaved()) {
      localStorage.removeItem(anime.id.toString());
      setFavedAnime(anime.id);
    }
  };

  return (
    <Card size="1">
      <Flex direction="column" align="center" justify="center">
        <Avatar size="5" src={coverImage.medium} fallback={title.english} />
        <Box>
          <Flex mt="3"align="center" justify="between" direction="row" width="100%" px="2" gap="2">
            <Text as="div" size="2" weight="bold" align="left">
              {title.english
                ? shortenText(title.english)
                : shortenText(title.romaji)}
            </Text>
            {!isFavoriteCard && (
              <Button
                onClick={isFaved() ? removeFromFavs : addToFavs}
                variant="outline"
                size="1"
                title={isFaved() || anime.isFaved ? "Remove" : "Add"}
              >
                {isFaved() || anime.isFaved ? (
                  <HeartFilledIcon />
                ) : (
                  <HeartIcon />
                )}
              </Button>
            )}

            {isFavoriteCard && (
              <Button
                onClick={removeFromFavs}
                variant="outline"
                title="Remove from favs"
                size="1"
              >
                <TrashIcon />
              </Button>
            )}      
      
          </Flex>
          <Text as="div" size="2" color="gray">
            {title.english && shortenText(title.romaji)}
          </Text>
          <Flex align="center" justify="center">
           
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export default AnimeCard;
