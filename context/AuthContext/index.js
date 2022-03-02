import { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({
  checkingSession: null,
  clearSessionData: null,
  error: null,
  isAuthenticated: null,
  persistSessionData: null,
  viewer: {},
});
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState();
  const [viewer, setViewer] = useState();

  const persistSessionData = (authPayload) => {
    if (authPayload.access_token && authPayload.refresh_token) {
      const decodedToken = jwtDecode(authPayload.access_token);
      const token_expiresAt = decodedToken.exp * 1000;
      const RefreshDecodedToken = jwtDecode(authPayload.refresh_token);
      const refresh_token_expiresAt = RefreshDecodedToken.exp * 1000;

      localStorage.setItem("token_expires_at", token_expiresAt);
      localStorage.setItem("access_token", authPayload.access_token);
      localStorage.setItem("refresh_token_expires_at", refresh_token_expiresAt);
      localStorage.setItem("refresh_token", authPayload.refresh_token);
      setViewer(decodedToken.sub);
    }
  };

  const isAuthenticated = () => {
    const expiresAt = localStorage.getItem("token_expires_at");
    const expiresRefreshAt = localStorage.getItem("refresh_token_expires_at");
    if (new Date().getTime() < expiresAt) {
      return true;
    } else if (new Date().getTime() < expiresRefreshAt) {
      Axios.get("http://localhost:8080/api/token/refresh", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("refresh_token"),
        },
      })
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          const decodedToken = jwtDecode(response.data.access_token);
          const token_expiresAt = decodedToken.exp * 1000;
          localStorage.setItem("token_expires_at", token_expiresAt);
        })
        .catch((error) => {
          setError(error);
        });
      return true;
    } else {
      return false;
    }
  };

  const clearSessionData = () => {
    localStorage.removeItem("token_expires_at");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token_expires_at");
    localStorage.removeItem("refresh_token");
    setViewer(null);
  };

  useEffect(() => {
    const getViewerIfAuthenticated = async () => {
      isAuthenticated();
      if (isAuthenticated() && !viewer) {
        Axios.get("http://localhost:8080/api/user/session", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
          .then((response) => {
            console.log(response.data);
            setViewer({ name: response.data.name });
          })
          .catch((error) => {
            window.location.reload(false);
            setError(error);
          });
      }
      setCheckingSession(false);
    };
    getViewerIfAuthenticated();
  }, [viewer]);

  return (
    <AuthContext.Provider
      value={{
        checkingSession,
        clearSessionData,
        error,
        isAuthenticated,
        persistSessionData,
        viewer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
