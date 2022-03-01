import React, { useState } from "react";
import styles from "./home.module.css";
import Head from "next/head";
import { Avatar } from "@material-ui/core";
import { Logout } from "../../../lib/queries/store.js";
import { useMutation } from "@apollo/client";
import { useAuth2 as useAuth } from "../../../context/AuthContext/index2";
import Loader from "../../../components/Loader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Axios from "axios";

export default function index() {
  const router = useRouter();
  const { clearSessionData, isAuthenticated, viewer } = useAuth();
  const [selected, setSelected] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

  const [logout] = useMutation(Logout, {
    onCompleted: () => {
      clearSessionData();
      router.push("/");
    },
  });

  useEffect(() => {
    const isUserAuth = isAuthenticated();
    if (!isUserAuth) {
      router.push("/");
    } else {
      Axios.get("http://localhost:8080/api/user/session", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          console.log(response.data);
          setName(response.data.name);
        })
        .catch((error) => {
          setError(error);
        });
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loader centered />;
  } else {
    return (
      <div>
        <Head>
          <title>{name} Dashboard</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <script
            type="module"
            src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
          ></script>
          <script
            nomodule
            src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
          ></script>
        </Head>
        <div className={styles.all}>
          <div className={styles.body}>
            <div className={styles.container}>
              <div
                className={`${styles.navigation} ${
                  isActive ? styles.active : ""
                }`}
              >
                <ul>
                  <li>
                    <a href="#">
                      <span className={styles.icon}>
                        <ion-icon name="storefront-outline"></ion-icon>
                      </span>
                      <span className={styles.title}>{name || ""}</span>
                    </a>
                  </li>
                  <li
                    className={selected === "dashboard" ? styles.hovered : ""}
                    onClick={() => setSelected("dashboard")}
                  >
                    <a href="#">
                      <span className={styles.icon}>
                        <ion-icon name="home-outline"></ion-icon>
                      </span>
                      <span className={styles.title}>Dashboard</span>
                    </a>
                  </li>
                  <li
                    className={
                      selected === "personalizar" ? styles.hovered : ""
                    }
                    onClick={() => setSelected("personalizar")}
                  >
                    <a href="#">
                      <span className={styles.icon}>
                        <ion-icon name="pencil-outline"></ion-icon>
                      </span>
                      <span className={styles.title}>Personalizar Web</span>
                    </a>
                  </li>
                  <li
                    className={selected === "clientes" ? styles.hovered : ""}
                    onClick={() => setSelected("clientes")}
                  >
                    <a href="#">
                      <span className={styles.icon}>
                        <ion-icon name="people-outline"></ion-icon>
                      </span>
                      <span className={styles.title}>Clientes</span>
                    </a>
                  </li>
                  <li
                    className={selected === "mensajes" ? styles.hovered : ""}
                    onClick={() => setSelected("mensajes")}
                  >
                    <a href="#">
                      <span className={styles.icon}>
                        <ion-icon name="chatbubble-outline"></ion-icon>
                      </span>
                      <span className={styles.title}>Mensajes</span>
                    </a>
                  </li>
                  <li
                    className={selected === "ayuda" ? styles.hovered : ""}
                    onClick={() => setSelected("ayuda")}
                  >
                    <a href="#">
                      <span className={styles.icon}>
                        <ion-icon name="help-outline"></ion-icon>
                      </span>
                      <span className={styles.title}>Ayuda</span>
                    </a>
                  </li>
                  <li
                    className={
                      selected === "configuracion" ? styles.hovered : ""
                    }
                    onClick={() => setSelected("configuracion")}
                  >
                    <a href="#">
                      <span className={styles.icon}>
                        <ion-icon name="settings-outline"></ion-icon>
                      </span>
                      <span className={styles.title}>Configuración</span>
                    </a>
                  </li>
                  <li
                    className={selected === "contrasena" ? styles.hovered : ""}
                    onClick={() => setSelected("contrasena")}
                  >
                    <a href="#">
                      <span className={styles.icon}>
                        <ion-icon name="lock-closed-outline"></ion-icon>
                      </span>
                      <span className={styles.title}>Contraseña</span>
                    </a>
                  </li>
                  <li
                    className={selected === "logout" ? styles.hovered : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                      setSelected("logout");
                    }}
                  >
                    <a href="#">
                      <span className={styles.icon}>
                        <ion-icon name="log-out-outline"></ion-icon>
                      </span>
                      <span className={styles.title}>Cerrar sesión</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div
                className={`${styles.main} ${isActive ? styles.active : ""}`}
              >
                <div className={styles.topbar}>
                  <div
                    className={styles.toggle}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <ion-icon name="menu-outline"></ion-icon>
                  </div>
                  <div className={styles.search}>
                    <label>
                      <input type="text" placeholder="Buscar..." />
                      <ion-icon name="search-outline"></ion-icon>
                    </label>
                  </div>
                  <div className={styles.user}>
                    <Avatar className={styles.avatar}>{`${name}` || ""}</Avatar>
                  </div>
                </div>

                <div className={styles.cardBox}>
                  <div className={styles.card}>
                    <div>
                      <div className={styles.numbers}>1,504</div>
                      <div className={styles.cardName}>Vistas</div>
                    </div>
                    <div className={styles.iconBx}>
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div>
                      <div className={styles.numbers}>80</div>
                      <div className={styles.cardName}>Ventas</div>
                    </div>
                    <div className={styles.iconBx}>
                      <ion-icon name="cart-outline"></ion-icon>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div>
                      <div className={styles.numbers}>284</div>
                      <div className={styles.cardName}>Comentarios</div>
                    </div>
                    <div className={styles.iconBx}>
                      <ion-icon name="chatbubbles-outline"></ion-icon>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div>
                      <div className={styles.numbers}>S/1,842</div>
                      <div className={styles.cardName}>Ingresos</div>
                    </div>
                    <div className={styles.iconBx}>
                      <ion-icon name="cash-outline"></ion-icon>
                    </div>
                  </div>
                </div>

                <div className={styles.details}>
                  <div className={styles.recentOrders}>
                    <div className={styles.cardHeader}>
                      <h2>Ordenes recientes</h2>
                      <a href="#" className={styles.btn}>
                        Ver todo
                      </a>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <td>Nombre</td>
                          <td>Precio</td>
                          <td>Pago</td>
                          <td>Estado</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Polo Ruben Blades</td>
                          <td>S/55</td>
                          <td>Plin</td>
                          <td>
                            <span
                              className={`${styles.status} ${styles.pending}`}
                            >
                              Pendiente
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Polo Hector Lavoe</td>
                          <td>S/65</td>
                          <td>Yape</td>
                          <td>
                            <span
                              className={`${styles.status} ${styles.delivered}`}
                            >
                              Enviado
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Polo Frankie Ruiz</td>
                          <td>S/60</td>
                          <td>Yape</td>
                          <td>
                            <span
                              className={`${styles.status} ${styles.return}`}
                            >
                              Retorno
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Polo Hector Lavoe</td>
                          <td>S/65</td>
                          <td>Yape</td>
                          <td>
                            <span
                              className={`${styles.status} ${styles.inprogress}`}
                            >
                              En progreso
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Polo Niche</td>
                          <td>S/65</td>
                          <td>Plin</td>
                          <td>
                            <span
                              className={`${styles.status} ${styles.delivered}`}
                            >
                              Enviado
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Polo Me sabe Peru</td>
                          <td>S/60</td>
                          <td>Plin</td>
                          <td>
                            <span
                              className={`${styles.status} ${styles.delivered}`}
                            >
                              Enviado
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Polo Hector Lavoe</td>
                          <td>S/65</td>
                          <td>Yape</td>
                          <td>
                            <span
                              className={`${styles.status} ${styles.pending}`}
                            >
                              Pendiente
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Polo Ruben Blades</td>
                          <td>S/60</td>
                          <td>Yape</td>
                          <td>
                            <span
                              className={`${styles.status} ${styles.inprogress}`}
                            >
                              En progreso
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Polo Frankie Ruiz</td>
                          <td>S/55</td>
                          <td>Plin</td>
                          <td>
                            <span
                              className={`${styles.status} ${styles.delivered}`}
                            >
                              Enviado
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Polo Niche</td>
                          <td>S/65</td>
                          <td>Yape</td>
                          <td>
                            <span
                              className={`${styles.status} ${styles.delivered}`}
                            >
                              Enviado
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={styles.recentCustomers}>
                    <div className={styles.cardHeader}>
                      <h2>Últimos Clientes</h2>
                    </div>
                    <table>
                      <tbody>
                        <tr>
                          <td width="60px">
                            <div className={styles.imgBx}>
                              <Avatar className={styles.avatar}>FG</Avatar>
                            </div>
                          </td>
                          <td>
                            <h4>Francisco</h4>
                            <span>San Miguel</span>
                          </td>
                        </tr>
                        <tr>
                          <td width="60px">
                            <div className={styles.imgBx}>
                              <Avatar className={styles.avatar2}>VL</Avatar>
                            </div>
                          </td>
                          <td>
                            <h4>Vanessa</h4>
                            <span>Jesus Maria</span>
                          </td>
                        </tr>
                        <tr>
                          <td width="60px">
                            <div className={styles.imgBx}>
                              <Avatar className={styles.avatar3}>VM</Avatar>
                            </div>
                          </td>
                          <td>
                            <h4>Victoria</h4>
                            <span>Lince</span>
                          </td>
                        </tr>
                        <tr>
                          <td width="60px">
                            <div className={styles.imgBx}>
                              <Avatar className={styles.avatar4}>AL</Avatar>
                            </div>
                          </td>
                          <td>
                            <h4>Andrea</h4>
                            <span>Los Olivos</span>
                          </td>
                        </tr>
                        <tr>
                          <td width="60px">
                            <div className={styles.imgBx}>
                              <Avatar className={styles.avatar}>AG</Avatar>
                            </div>
                          </td>
                          <td>
                            <h4>Andy</h4>
                            <span>San Miguel</span>
                          </td>
                        </tr>
                        <tr>
                          <td width="60px">
                            <div className={styles.imgBx}>
                              <Avatar className={styles.avatar2}>DL</Avatar>
                            </div>
                          </td>
                          <td>
                            <h4>Dasha</h4>
                            <span>Ventanilla</span>
                          </td>
                        </tr>
                        <tr>
                          <td width="60px">
                            <div className={styles.imgBx}>
                              <Avatar className={styles.avatar3}>JD</Avatar>
                            </div>
                          </td>
                          <td>
                            <h4>Jorge</h4>
                            <span>Callao</span>
                          </td>
                        </tr>
                        <tr>
                          <td width="60px">
                            <div className={styles.imgBx}>
                              <Avatar className={styles.avatar4}>RG</Avatar>
                            </div>
                          </td>
                          <td>
                            <h4>Renato</h4>
                            <span>Cercado de Lima</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
