import { gql, GraphQLClient, useQuery } from "graphql-request";

const ALL_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;

export const useGQLQuery = async (key, query, variables, config = {}) => {
  const endpoint = "https://countries.trevorblades.com/";
  const graphQLClient = new GraphQLClient(endpoint);
  const fetchData = async () => await graphQLClient.request(query, variables);

  return useQuery(key, fetchData, config);
};
