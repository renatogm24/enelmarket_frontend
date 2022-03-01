import gql from "graphql-tag";

export const GET_STORES = gql`
  query GET_STORES {
    stores {
      id
      storeName
      name
      lastname
      mail
      password
    }
  }
`;

export const GET_STORES_NAMES = gql`
  query GET_STORES_NAMES {
    stores {
      id
      storeName
    }
  }
`;

export const GET_STORE_BY_NAME = gql`
  query GET_STORE_BY_NAME($idName: String!) {
    store(idName: $idName) {
      id
      storeName
      name
      lastname
      mail
      password
    }
  }
`;

export const IS_MAIL_USED = gql`
  query IS_MAIL_USED($mail: String!) {
    isMailUsed(mail: $mail)
  }
`;

export const ADD_STORE = gql`
  mutation createStore($store: StoreInput!) {
    createStore(store: $store) {
      store {
        id
        storeName
        name
        lastname
        mail
        password
      }
    }
  }
`;

export const Login = gql`
  mutation Login($password: String!, $mail: String!) {
    login(password: $password, mail: $mail) {
      token
      store {
        id
        storeName
        name
        lastname
        mail
        password
      }
    }
  }
`;

export const Logout = gql`
  mutation Logout {
    logout
  }
`;

export const GetViewer = gql`
  query GetViewer {
    viewer {
      id
      mail
      name
      lastname
      storeName
    }
  }
`;
