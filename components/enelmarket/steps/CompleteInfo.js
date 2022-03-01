import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import { useMutation } from "@apollo/client";
import { ADD_STORE, IS_MAIL_USED } from "../../../lib/queries/store";
import { useQuery, useLazyQuery } from "@apollo/client";

export default function CompleteInfo({ setStep, storeName }) {
  const [addStore] = useMutation(ADD_STORE, {
    onCompleted: () => {
      setStep("finish");
    },
  });

  const [errorMail, setErrorMail] = useState({
    val: false,
    msg: "",
  });

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [getData, { loading, data }] = useLazyQuery(IS_MAIL_USED, {
    onCompleted: () => {
      onSubmitInfo();
    },
  });

  const onSubmitInfo = () => {
    if (data?.isMailUsed) {
      setErrorMail({
        val: true,
        msg: "Correo en uso",
      });
    } else {
      const varInput = {
        store: {
          storeName,
          name,
          lastname,
          mail,
          password,
        },
      };

      addStore({
        variables: varInput,
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -1000, opacity: 0 }}
        className="bg-gray-100 w-4/5 h-auto rounded-xl text-gray-800 px-4 py-10 flex flex-col xl:w-1/2 xl:self-start"
      >
        <div className="flex font-roboto-700 font-bold text-2xl mb-6">
          Paso 2. Completa tus datos
        </div>
        <div className="flex flex-col justify-center w-full">
          <form
            className="flex flex-col w-full"
            onSubmit={(e) => {
              e.preventDefault();
              getData({ variables: { mail } });
            }}
          >
            <div className="flex flex-col w-5/6 self-center items-center space-y-2">
              <TextField
                required
                id="nameText"
                label="Nombres"
                variant="outlined"
                className="w-full"
                autoComplete="off"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                required
                id="lastnameText"
                label="Apellidos"
                variant="outlined"
                className="w-full"
                autoComplete="off"
                name="lastname"
                onChange={(e) => setLastname(e.target.value)}
              />
              <TextField
                required
                id="mailText"
                label="Correo"
                type="mail"
                variant="outlined"
                className="w-full"
                autoComplete="off"
                name="mail"
                onChange={(e) => setMail(e.target.value)}
                error={errorMail.val}
                helperText={errorMail.msg}
              />
              <TextField
                required
                id="password"
                label="Clave"
                type="password"
                variant="outlined"
                className="w-full"
                autoComplete="new-password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 w-5/6 self-center text-white font-bold rounded-xl px-8 py-4 mt-8"
            >
              ¡Configura tu tienda!
            </button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
