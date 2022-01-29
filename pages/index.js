// import { ALL_CONTINENTS, useGQLQuery } from "../lib/products";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { gql, request } from "graphql-request";
import styles from "../styles/Home.module.css";

const ALL_CONTINENTS = gql`
  {
    continents {
      name
      code
    }
  }
`;

const getContinents = async () =>
  await await request("https://countries.trevorblades.com/", ALL_CONTINENTS);

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
  const { data, error } = useQuery("countries", getContinents);
  console.log(data);
  // const {
  //   data: { countries },
  // } = data;
  // console.log("countries: ", countries);

  error ? <div>Opps there was an error</div> : "";
  if (!data) return <div>No data!</div>;

  return (
    <div className={styles.container}>
      {data.continents.map((continent) => {
        return <p key={continent.name}>{continent.name}</p>;
      })}
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("countries", getContinents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
