import { Media, PageInfo } from "@/types/types";

type Payload = {
  Page: {
    media: Media[];
    pageInfo: PageInfo;
  };
};

type Data = {
  data: Payload;
  errors?: any;
};

export const searchAnime = async (query: string) => {
  const handleResponse = (response: any) => {
    return response.json().then(function (json: any) {
      return response.ok ? json : Promise.reject(json);
    });
  };

  const handleData = (data: Data) => {
    return data.data;
  };

  const handleError = (error: any) => {
    console.log(error.message);
    return error;
  };
  var aniQuery = `
  query ($page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (search: $search) {
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
    search: query,
    page: 1,
    perPage: 20,
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

  const response = await fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);
  return response;
};
