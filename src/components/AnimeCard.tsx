import { Card, Flex, Avatar, Text, Box } from "@radix-ui/themes";

interface PropsI {
    
}

const AnimeCard = () => {

    return (
      <Card>
        <Flex>
        <Avatar
        size="3"
        src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
        fallback="T"
      />
       <Box>
        <Text as="div" size="2" weight="bold">
          Teodros Girmay
        </Text>
        <Text as="div" size="2" color="gray">
          Engineering
        </Text>
      </Box>
        </Flex>
      </Card>
    );
} 

export default AnimeCard
