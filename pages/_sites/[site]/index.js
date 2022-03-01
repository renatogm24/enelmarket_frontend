import Head from "next/head";
import { Page, Text, Link, List } from "@vercel/edge-functions-ui";
//import { createClient } from "contentful";
import Skeleton from "../../../components/Skeleton";
import Loader from "../../../components/Loader";
import PageNotice from "../../../components/PageNotice";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_STORE,
  GET_STORES_NAMES,
  GET_STORE_BY_NAME,
} from "../../../lib/queries/store";
import { initializeApollo } from "../../../lib/apollo";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Index({ dataStore }) {
  const [addStore] = useMutation(ADD_STORE, {
    onCompleted: () => {
      window.location.reload();
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const varInput = {
      store: {
        storeName: e.target.storeName.value,
        name: e.target.name.value,
        lastname: e.target.lastname.value,
        mail: e.target.mail.value,
        password: e.target.password.value,
      },
    };
    addStore({
      variables: varInput,
    });
  };

  const { data, error, loading } = useQuery(GET_STORES_NAMES);

  let content = null;

  if (loading && !data) {
    content = <Loader centered />;
  } else if (data?.stores) {
    const stores = data.stores;
    content = (
      <Page>
        <Head>
          <title>{dataStore.storeName} - Vercel Edge Functions</title>
        </Head>
        <Text variant="h1" className="mb-6">
          <p>{dataStore.storeName}</p>
        </Text>
        <div className="mb-4">
          <Link className="mr-2.5" href="/">
            Home
          </Link>
          <Link href="/about">About</Link>
        </div>
        <Text variant="h2" className="mb-6">
          More examples:
        </Text>
        <List>
          {stores &&
            stores.map((item) => {
              return (
                <li key={item.id}>
                  <Link href={`https://${item.storeName}.enelmarket.com`}>
                    {item.storeName}
                  </Link>
                </li>
              );
            })}
        </List>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            fullWidth
            variant="filled"
            color="primary"
            margin="normal"
            name="storeName"
            placeholder="store name"
          />
          <TextField
            fullWidth
            variant="filled"
            color="primary"
            margin="normal"
            name="name"
            placeholder="name"
          />
          <TextField
            fullWidth
            variant="filled"
            color="primary"
            margin="normal"
            name="lastname"
            placeholder="lastname"
          />
          <TextField
            fullWidth
            variant="filled"
            color="primary"
            margin="normal"
            name="mail"
            placeholder="mail"
          />
          <TextField
            fullWidth
            variant="filled"
            color="primary"
            margin="normal"
            name="password"
            placeholder="password"
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Page>
    );
  } else if (error) {
    content = <PageNotice text="Información no disponible" />;
  }

  return content;
}

//const client = createClient({
//  space: process.env.CONTENTFUL_SPACE_ID,
//  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
//});

const apolloClient = initializeApollo();

export async function getStaticPaths() {
  const {
    data: { stores },
  } = await apolloClient.query({
    query: GET_STORES_NAMES,
  });

  const filteredStores = stores.filter((item) =>
    item.storeName !== "enelmarket" && item.storeName !== "admin" ? true : false
  );

  // build paths for each of the sites in the previous two lists
  const paths = [
    ...filteredStores.map((item) => {
      return { params: { site: item.storeName } };
    }),
  ];

  return {
    paths: paths,
    fallback: true, // fallback true allows sites to be generated using ISR
  };
}

export async function getStaticProps({ params: { site } }) {
  // check if site is a custom domain or a subdomain
  //const customDomain = site.includes(".") ? true : false;

  if (site == "enelmarket.com" || site == "localhost:3000") {
    site = "enelmarket";
  }

  const {
    data: { store },
  } = await apolloClient.query({
    query: GET_STORE_BY_NAME,
    variables: {
      idName: site,
    },
  });

  if (!store) {
    return {
      redirect: {
        destination: "https://enelmarket.com/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      dataStore: store,
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1, // set revalidate interval of 5s
  };
}
