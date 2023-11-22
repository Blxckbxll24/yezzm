import React from "react";
import '../styles/dash.css'
import { Link } from "react-router-dom";

/*Importaciones de imagenes*/
import Unit from '../images/categoria.png'
import grupo from '../images/grupo.png'
import music from '../images/musica.png'
import album from '../images/album.png'
import artis from '../images/artista.png'
import cal from '../images/calendario.png'
import rango from '../images/rango-de-pagina.png'
import trafic from '../images/trafico-web.png'
import grafic from '../images/grafico.png'
import idea from '../images/idea.png'
import trab from '../images/trabajo-en-equipo.png'

/*Desde aqui comienza el sitio web*/
function Dash() {
  // Verificar si el usuario ha iniciado sesión
  const usuarioRegistrado = true; // Cambia esto según tu lógica de autenticación

  return (
    <>
      <body className="monaco1">
        <header class="cabecera1">
          <div class="listado1">
            <div className="contenedor-dash1">
              <h2 className="yezz">Yeezy Music</h2>
              <div className="carta-dash1">
                 
                <img className="grupo-dash1" src={Unit} alt="" />
                <h2 className="dash1">Dashboard</h2>
                
              </div>
              <hr />
              <h4 className="ges1">Gestión</h4>

              <div className="barra-lateral1">
                
                  <>
                  <Link class="ft" to='/Usuariosdash'>
                    <div className="carta1">
                    <img className="grupo1" src={grupo} alt="" />
                      <h2 className="carta-titulo1">Usuarios</h2>
                    </div>
                    </Link>
                    <div className="carta1">
                    <img className="grupo1" src={music} alt="" />
                      <h2 className="carta-titulo1">Canciones</h2>
                    </div>
                    <div className="carta1">
                      <img className="grupo1" src={album} alt="" />
                      <h2 className="carta-titulo1">Álbumes</h2>
                    </div>
                    <div className="carta1">
                      <img className="grupo1" src={artis} alt="" />
                      <h2 className="carta-titulo1">Artistas</h2>
                    </div>
                  </>
                
              </div>
              <div className="contenido-principal1">
                {/* Contenido principal */}
              </div>
            </div>
          </div>
        </header>
        <div className="pantalla">
  <div className="bienvenida">
    <h2 className="ti">Bienvenido usuario Administrador al Dashboard</h2>
  </div>
    
  <div className="Menu-Principal">
                  <div className="carta2">
                  <img className="grupo2" src={grafic} alt="" />
                    <h2 className="carta-titulo2">Estadisticas</h2>
                  </div>
                  
                  <div className="carta2">
                  <img className="grupo2" src={trab} alt="" />
                    <h2 className="carta-titulo2">Vistas</h2>
                  </div>
                  <div className="carta2">
                    <img className="grupo2" src={rango} alt="" />
                    <h2 className="carta-titulo2">Rango del Sitio</h2>
                  </div>
                  <div className="carta2">
                    <img className="grupo2" src={trafic} alt="" />
                    <h2 className="carta-titulo2">Usuarios en Uso</h2>
                  </div>
                  <div className="carta2">
                    <img className="grupo2" src={idea} alt="" />
                    <h2 className="carta-titulo2">Actividades</h2>
                  </div>
                  <div className="carta2">
                    <img className="grupo2" src={cal} alt="" />
                    <h2 className="carta-titulo2">Calendario</h2>
                  </div>
              
            </div>
  </div>


      </body>
    </>
  );
}

export default Dash;
