import styles from "../styles/login_user.module.css";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import icongogle from "../images/google.png";

function Login() {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleFacebookLogin = (response) => {
    localStorage.setItem('facebookUserData', JSON.stringify(response));
    setUserData(response);
    console.log("URL de la imagen de perfil de Facebook:", response.picture);
  };

  const handleLogout = () => {
    setUserData(null);
  };

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem('googleUserData', JSON.stringify(codeResponse));
      setUser(codeResponse);
      setLoggedIn(true);
      navigate("/inicio")
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem('googleUserData');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      setLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    const storedUserData = localStorage.getItem('facebookUserData');
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
    setLoggedIn(false);
    localStorage.removeItem('googleUserData');
  };

  return (
    <>
      <div class={styles.navbar}>
        <div class={styles.navbar}>
          <img
            class={styles.logo}
            src={require("../images/Untitled.png")}
            alt="Logo"
          />
        </div>
      </div>
      <body className={styles.casa}>
        <div class={styles.container}>
          <h1>Inicia sesión en Yeezy</h1>
          <div class={styles.sociallogin}>
            {!loggedIn && (
              <>
                <button class={styles.Sign} onClick={() => login()}>
                  <img src={icongogle} class={styles.go} alt="" />
                  Continuar con Google
                </button>
              </>
            )}




<FacebookLogin
               appId="1283592775680508"
               autoLoad={false}
               fields="name,email,picture"
               onClick={() => console.log("Evento Click")}
               callback={handleFacebookLogin}
               textButton="Registrate con Facebook"
              icon="fa-facebook"
               cssClass="facebook"
             />
             {/* Mostramos los datos del usuario si están disponibles de Facebook */}
             

             {/* <button class="facebook"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                             <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                         </svg>                      Iniciar con Facebook</button> */}

             <button class="apple">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="16"
                 height="16"
                 fill="currentColor"
                 class="bi bi-apple"
                 viewBox="0 0 16 16"
               >
                 <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                 <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
               </svg>{" "}
               Iniciar con Apple
            </button>
             <button class="Telefono">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="16"
                 height="16"
                 fill="currentColor"
                 class="bi bi-telephone-fill"
                 viewBox="0 0 16 16"
               >
                 <path
                   fill-rule="evenodd"
                   d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                 />
               </svg>{" "}
               Continuar con teléfono{" "}
             </button>
           </div>
           <div class={styles.ordivider}>
             <div class={styles.line}></div>
             <div class={styles.line}></div>
             <div class={styles.line}></div>
           </div>
           <div class={styles.phonelogin}>
             <form className={styles.phonelogin}>
               <input
                 className={styles.phonelogin}
                 type="text"
                 placeholder="Email o nombre de usuario"
               />
               <input
                className={styles.phonelogin}
                type="tel"
                 placeholder="Contraseña"
               />
               <Link to="/inicio">
                 {" "}
                 <button className={styles.phonelogin} type="submit">
                  Inicia sesión
                </button>
               </Link>
             </form>
           </div>
         </div>
       </body>
     </>
   );
 }

 export default Login;