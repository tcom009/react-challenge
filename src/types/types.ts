export type Media ={
    id: number, 
    coverImage: {
      medium: string
    }
    title:{
      english: string
      romaji: string
    }
    isFaved?: boolean
  }

export type PageInfo = {
    total:       number;
    currentPage: number;
    lastPage:    number;
    hasNextPage: boolean;
    perPage:     number;
}