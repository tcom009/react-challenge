

type Media ={
  id: number, 
  coverImage: {
    medium: string
  }
  title:{
    english: string
    romaji: string
  }
}

type Payload = {
  Page:{
    media:Media
  }
}

type Data = {
  data : Payload
}

export const searchAnime = ( query: string) => {
  const handleResponse = (response: any) => {
    return response.json().then(function (json: any) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  const handleData = (data: Data) => {
    console.log(data.data);
  }

  const handleError = (error: any) => {
    console.error(error);
  }
  var aniQuery = `
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search) {
        id
        title {
          romaji,
          english
        }
        coverImage {
          medium
        }
      }
    }
  }
  `;

  var variables = {
    search: "Fate/Zero",
    page: 1,
    perPage: 10,
  };

  const url = "https://graphql.anilist.co";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: aniQuery,
      variables: variables,
    }),
  };

  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  return{
    handleResponse,
    handleData,
    handleError
  };
};
