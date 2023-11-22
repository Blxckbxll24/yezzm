import React from "react";
import '../components/Navdash.css'
import { Link } from "react-router-dom";

/*Importaciones de imagenes*/
import Unit from '../images/categoria.png'
import grupo from '../images/grupo.png'
import music from '../images/musica.png'
import album from '../images/album.png'
import artis from '../images/artista.png'

/*Desde aqui comienza el sitio web*/
function Dashnav() {
  // Verificar si el usuario ha iniciado sesión
  const usuarioRegistrado = true; // Cambia esto según tu lógica de autenticación

  return (
    <>
      <body className="monaco">
        <header class="cabecera">
          <div class="listado">
            <div className="contenedor-dash">
              <h2 className="yezz">Yeezy Music</h2>
              <Link className="grupo-dash" to='/dash'>
              <div className="carta-dash">
                
                <img className="grupo-dash" src={Unit} alt="" />
                <h2 className="dash">Dashboard</h2>
                
              </div>
              </Link>
              <hr />
              <h4 className="ges">Gestión</h4>

              <div className="barra-lateral">
                
                  <>
                    <div className="carta">
                      <img className="grupo" src={grupo} alt="" />
                      <h2 className="carta-titulo">Usuarios</h2>
                    </div>
                    <div className="carta">
                      <img className="grupo" src={music} alt="" />
                      <h2 className="carta-titulo">Canciones</h2>
                    </div>
                    <div className="carta">
                      <img className="grupo" src={album} alt="" />
                      <h2 className="carta-titulo">Álbumes</h2>
                    </div>
                    <div className="carta">
                      <img className="grupo" src={artis} alt="" />
                      <h2 className="carta-titulo">Artistas</h2>
                    </div>
                  </>
                
              </div>
              <div className="contenido-principal">
                {/* Contenido principal */}
              </div>
            </div>
          </div>
        </header>

      </body>
    </>
  );
}

export default Dashnav;
