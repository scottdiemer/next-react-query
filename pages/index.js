// import { ALL_CONTINENTS, useGQLQuery } from "../lib/products";
import { dehydrate, QueryClient, useQuery } from "react-query";
// import { gql, request } from "graphql-request";
import { getCountries, getContinents } from "../lib/locations";
import styles from "../styles/Home.module.css";

// const getcontinents = async () =>
//   await await request("https://countries.trevorblades.com/", all_continents);

// const getContinents = async () =>
//   await (
//     await fetch("https://countries.trevorblades.com/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         query: `
//          query {
//             continents {
//               name
//               code
//             }
//           }
//       `,
//       }),
//     })
//   ).json();
// await (await fetch("https://api.spacexdata.com/v4/launches/latest")).json();

export default function Home() {
  const { data: continentsData, continentsError } = useQuery(
    "continents",
    getContinents
  );
  const { data: countriesData, countriesError } = useQuery(
    "countries",
    getCountries
  );

  continentsError || countriesError ? <div>Oops there was an error</div> : "";
  continentsData || countriesData ? <div>No data!</div> : "";

  return (
    <div className={styles.container}>
      <h2>Continents</h2>
      {continentsData.continents.map((continent) => {
        return <p key={continent.name}>{continent.name}</p>;
      })}
      <h2>Countries</h2>
      {countriesData.countries.map((country) => {
        return <p key={country.name}>{country.name}</p>;
      })}
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient
    .prefetchQuery("continents", getContinents)
    .then(await queryClient.prefetchQuery("countries", getCountries));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
