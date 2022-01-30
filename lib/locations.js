import { gql, request } from "graphql-request";

export const endpoint = "https://countries.trevorblades.com/";

const ALL_CONTINENTS = gql`
  {
    continents {
      name
      code
    }
  }
`;

const ALL_COUNTRIES = gql`
  {
    countries {
      code
      name
    }
  }
`;

export const getContinents = async () =>
  await await request(endpoint, ALL_CONTINENTS);

export const getCountries = async () =>
  await await request(endpoint, ALL_COUNTRIES);
