import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import Svg from "../../../components/enelmarket/svg.js";
import { useRouter } from "next/router";
import { Login as LoginMutation } from "../../../lib/queries/store.js";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useAuth2 as useAuth } from "../../../context/AuthContext/index2";
import Loader from "../../../components/Loader";

function index() {
  const { isAuthenticated, persistSessionData } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [loadingComp, setLoadingComp] = useState(true);

  const onCompleted = (data) => {
    const { token, store } = Object.entries(data)[0][1];
    persistSessionData({ token, viewer: store });
    router.push("/home");
  };

  const [login, { error, loading }] = useMutation(LoginMutation, {
    onCompleted,
  });

  const loginSpring = async ({ password, mail }) => {
    const body = { password: password, username: mail };
    console.log(`body json object that will be POSTed is :${body}`);
    console.log(password);
    console.log(mail);

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        //setToken(res.headers.get("Authorization"));
        return res.json().then((data) => {
          console.log(data);
          const { access_token, refresh_token } = data;
          persistSessionData({ access_token, refresh_token });
          router.push("/home");
        });
      } else {
        // return res.json().then((errors) => {
        console.log(res);
        // });
      }
    });
  };

  let isUserAuth = false;

  useEffect(() => {
    isUserAuth = isAuthenticated();
    if (isUserAuth) {
      router.push("/home");
    } else {
      setLoadingComp(false);
    }
  }, []);

  return loadingComp ? (
    <Loader centered />
  ) : (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow p-8 max-w-sm w-10/12">
        <h1 className="mb-4 text-2xl w-full">
          <Svg color={"#333"} />
        </h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            loginSpring({ password, mail }).catch((err) => {
              console.error(err);
            });
          }}
        >
          <TextInput
            className="mb-4"
            hiddenLabel
            id="username"
            inputWidthClass="w-full"
            label="Username"
            placeholder="Tu correo"
            type="text"
            onChange={(event) => {
              setMail(event.target.value);
            }}
            value={mail}
          />
          <TextInput
            className="mb-8"
            hiddenLabel
            id="password"
            inputWidthClass="w-full"
            label="Password"
            placeholder="Tu clave"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <div className="flex items-center">
            <Button
              className="mr-2"
              text="Ingresa"
              type="submit"
              disabled={loading}
            />
            <p className="text-gray-400">¿Nuevo?</p>
            <button
              className="text-blue-500 hover:text-blue-700 ml-1 focus:outline-none hover:underline"
              onClick={(event) => {
                event.preventDefault();
                router.push("https://enelmarket.com/");
              }}
            >
              Registrate
            </button>
          </div>
          {error && (
            <p className="mt-4 text-red-500 text-sm">
              Correo o clave incorrecta
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
export default index;