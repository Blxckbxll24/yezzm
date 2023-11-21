import React, { useState, useEffect } from "react";
import styles from '../styles/inicio.module.css'
import { Link } from "react-router-dom";
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import Player from "./reproductor";
//Funciones del Clima
function Inicio() {
    const [user, setUser] = useState([]);
    const [userData, setUserData] = useState([]);
    const [profile, setProfile] = useState([]);
    const [isProfilePopupVisible, setProfilePopupVisible] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const storedUserDataGoogle = localStorage.getItem('googleUserData');
        const storedUserDataFacebook = localStorage.getItem('facebookUserData');
        if (storedUserDataFacebook) {
            setProfile(JSON.parse(storedUserDataFacebook));
        }


        if (storedUserDataGoogle) {
            setUser(JSON.parse(storedUserDataGoogle));
            setLoggedIn(true);

            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);



    const handleProfileClick = () => {
        setProfilePopupVisible(!isProfilePopupVisible);
    };

    const logOut = (e) => {
        googleLogout(); // Asegúrate de utilizar la función de logout de Google
        setUser(null);
        setProfile(null);
        setLoggedIn(false);
        localStorage.removeItem('googleUserData');
        localStorage.removeItem('facebookUserData');
    };

    //Funciones del clima
    const api = {
        key: "c1505a0fddf97748788a84ef83f9461a",
        base: "https://api.openweathermap.org/data/2.5/"
      };
      const translateWeatherMain = (main) => {
        switch (main) {
          case "Clear":
            return "Despejado";
          case "Clouds":
            return "Nublado";
          case "Rain":
            return "Lluvia";
          default:
            return main;
        }
    };
        const [search, setSearch] = useState("");
        const [weather, setWeather] = useState(null);
        
        useEffect(() => {
          if (!weather) {
            fetch(`${api.base}weather?q=Cancun&units=metric&lang=es&APPID=${api.key}`)
              .then((res) => res.json())
              .then((result) => {
                setWeather(result);
              });
          }
        }, [weather]);
      
        const searchPressed = () => {
            fetch(`${api.base}weather?q=${search}&units=metric&lang=es&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
              setWeather(result);
              setSearch("");
            });
        
        };
        
    

    return (
        <>
            <body>


                <div className={styles.container}>
                    <aside>
                        <div className={styles.menu}>
                            <Link className={styles.active} to="#"><span><img src={require('../images/home.svg')} alt="" /></span>Inicio</Link>
                            <Link to='/buscador'><span><img src={require('../images/search.svg')} alt="" /></span>Buscar</Link>
                            <Link to="/likeit"><span><img src={require('../images/heart.svg')} alt="" /></span>Canciones que te gustan</Link>
                            <Link to="/agregados"><span><img src={require('../images/add.svg')} alt="" /></span>Albumes & Playlist guardadas</Link>
                            {/* Apartado del */}
                            <div className="clow">
                                
                            {weather && (
                                <div className={styles.datos}>
                                  <img class={styles.wea} src={require('../images/nubes.png')} alt="" />  <br />
                               
                                
                                <span class={styles.wea}>{weather.main.temp}°C</span><br />
                                <span class={styles.wea}>{weather.name}</span>
                                </div>
                            )}
                                </div>
                            {/* ------ */}

                        </div>
                    </aside>
                    <section className={styles.casco}>
                        <header>

                            <div className={styles.botones_prev_next}>
                                <Link to='/pago'> <button className={styles.boton}>
                                    Suscribete
                                </button></Link>
                            </div>

                            <div className={styles.suscribcion}>
                                <div className={styles.perfil} onClick={handleProfileClick}>
                                    {loggedIn ? (
                                        <div className={styles.perfil} onClick={handleProfileClick}>
                                            <span className={styles.circulo}>
                                                <img className={styles.circulo} src={profile.picture} alt="Imagen de perfil" />
                                            </span>
                                            <span className={styles.nombre}>Perfil</span>
                                            <span>
                                                <img src={require('../images/salir.svg')} alt="" />
                                            </span>
                                        </div>
                                    ) : (
                                        // Si no hay nadie logueado, muestra el botón para ir al inicio
                                        <Link to="/login">
                                            <button className={styles.boton}>
                                                Inicia Sesión
                                            </button>
                                        </Link>
                                    )}

                                    {!isProfilePopupVisible && loggedIn && (
                                        <div className={styles.profilePopup}>
                                            <span className={styles.circulo}>
                                                <img className={styles.circulo} src={profile.picture} alt="Imagen de perfil" />
                                            </span>
                                            <span className={styles.nombre}> {profile.name}</span>
                                            <span className={styles.nombre}> {profile.email}</span>
                                            <button className={styles.boton0} onClick={logOut}>Cerrar sesión</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </header>
                        <div className={styles.contenedor_degradado}>
                            <div className={styles.banner}>
                                <div className={styles.cancion}>
                                    <Link to='/temerarios'>
                                        <figure>
                                            <img src={require('../images/temerarios.webp')} alt="" />
                                        </figure>
                                    </Link>
                                </div>
                                <div className={styles.cancion}>
                                    <Link to='/gatonoche'>
                                        <figure>
                                            <img src={require('../images/gatanoche.jpeg')} alt="" />
                                        </figure>
                                    </Link>
                                </div>
                                <div className={styles.cancion}>
                                    <Link to='/esclava'>
                                        <figure>
                                            <img src={require('../images/esclava.jpeg')} alt="" />
                                        </figure>\
                                    </Link>
                                </div>
                                <div className={styles.cancion}>
                                    <Link to='/chayanne'>
                                        <figure>
                                            <img src={require('../images/chayanne.jpeg')} alt="" />
                                        </figure>
                                    </Link>

                                </div>
                            </div>
                        </div>
                        <div className={styles.contenedor_contenido}>
                            <div className={styles.titulos}>
                                <h1>¡Buenos días!</h1>
                            </div>
                            <div className={styles.generos}>

                                <div className={styles.cards}>
                                    <Link className={styles.card_text} to='/finde'>
                                        <div className={styles.card_imagen}><img src={require('../images/afterhours.jpeg')} alt="" /></div>
                                        <div className={styles.card_text}>
                                        
                                            <h4>After Hours</h4>
                                            <img src={require('../images/play.svg')} alt="" />
                                    
                                        </div>
                                    </Link>
                                </div>
                                <div className={styles.cards}>
                                    <Link className={styles.card_text} to='/raraw'>
                                        <div className={styles.card_imagen}><img src={require('../images/RauwMix.png')} alt="" /></div>
                                        <div className={styles.card_text}>
                                            <h4>Rauw Alejandro mix</h4>
                                            <img src={require('../images/play.svg')} alt="" />
                                        </div>
                                    </Link>
                                </div>
                                <div className={styles.cards}>
                                    <Link className={styles.card_text} to='/dobleaa'>
                                        <div className={styles.card_imagen}><img src={require('../images/RHLM.png')} alt="" /></div>
                                        <div className={styles.card_text}>
                                            <h4>Real hasta la muerte</h4>
                                            <img src={require('../images/play.svg')} alt="" />
                                        </div>
                                    </Link>
                                </div>

                                <div className={styles.cards}>
                                    <Link className={styles.card_text} to='/acosta'>
                                        <div className={styles.card_imagen}>

                                            <img src={require('../images/Rdia23.png')} alt="" /></div>
                                        <div className={styles.card_text}>
                                            <h4>Rdia23</h4>
                                            <img src={require('../images/play.svg')} alt="" />

                                        </div>
                                    </Link>

                                </div>
                                <div className={styles.cards}>
                                    <Link className={styles.card_text} to='/unveranosinti'>
                                        <div className={styles.card_imagen}><img src={require('../images/VST.png')} alt="" /></div>
                                        <div className={styles.card_text}>
                                            <h4>Un verano sin ti</h4>
                                            <img src={require('../images/play.svg')} alt="" />
                                        </div>
                                    </Link>
                                </div>
                                <div className={styles.cards}>
                                    <Link className={styles.card_text} to='/drake'>
                                        <div className={styles.card_imagen}><img src={require('../images/Scorp.png')} alt="" /></div>
                                        <div className={styles.card_text}>
                                            <h4>Scorpion</h4>
                                            <img src={require('../images/play.svg')} alt="" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.titulos}>
                                <h2>Tus podcast</h2>
                                <span>Aquí tienes tu contenido preferido</span>
                            </div>

                            <div className={styles.podcast}>
                                <div className={styles.card_podcast}>
                                    <img src={require('../images/F1L.png')} alt="" />
                                    <h4>F1nal lap</h4>
                                    <p>troop audio</p>
                                </div>
                                <div className={styles.card_podcast}>
                                    <img src={require('../images/FutP.png')} alt="" />
                                    <h4>Fútbol picante</h4>
                                    <p>ESPN deportes</p>
                                </div>
                                <div className={styles.card_podcast}>
                                    <img src={require('../images/Edge.png')} alt="" />
                                    <h4>F1 On The Edge</h4>
                                    <p>The Ringer</p>
                                </div>
                                <div className={styles.card_podcast}>
                                    <img src={require('../images/Cuent.png')} alt="" />
                                    <h4>Cuentos para dormir</h4>
                                    <p>Cuentos AMG</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer>
<Player></Player>
                    </footer>
                </div>
            </body>
        </>
    )
}

export default Inicio;