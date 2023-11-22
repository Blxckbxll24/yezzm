import React, { useState,useEffect } from "react";
import styles from '../styles/pago.module.css'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const PAYPAL_CLIENT_ID = 'AdwObl8zvI4sB0iG1UJi85kaIBMaL8wQkh6obtqTqNIrS-z7gVfM7KZB61jlnzC_w9zMzuIJDDeO-DuS';
initMercadoPago("APP_USR-d6f07d7b-83ef-4236-a3dd-101e41e02f11");

function Pago() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [showPayPalButtons, setShowPayPalButtons] = useState(false);
  const [showPayPalmerca, setShowPayPalmerca] = useState(false);
  const navigate =useNavigate();

  const [storedPayments, setStoredPayments] = useState([]);

  useEffect(() => {
    // Obtener la información de pagos almacenada en localStorage
    const storedPayments = JSON.parse(localStorage.getItem("payments")) || [];
    setStoredPayments(storedPayments);
  }, []);

  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:8082/create_preference", {
        description: "Yeezy Music INC.",
        price: 129,
        quantity: 1,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
      
      // Actualizar el estado o realizar cualquier otra lógica necesaria
      setShowPayPalButtons(true);
      setShowPayPalmerca(false);
  
      // Almacenar la información en localStorage
      const paymentInfo = {
        id,
        method: "Mercado Pago",
        timestamp: new Date().toISOString(),
      };
  
      // Verificar si localStorage es compatible en el navegador
      if (typeof Storage !== "undefined") {
        // Obtener los pagos existentes del localStorage o inicializar un array vacío
        const payments = JSON.parse(localStorage.getItem("payments")) || [];
  
        // Agregar el nuevo pago al array
        payments.push(paymentInfo);
  
        // Guardar el array actualizado en localStorage
        localStorage.setItem("payments", JSON.stringify(payments));
      } else {
        console.error("El navegador no es compatible con localStorage.");
      }
    }
  };

  const handlePaymentApproval = (data, actions) => {
    localStorage.setItem('paypaaaal', JSON.stringify(data));
      


      const nuevaOrden = {
        
        fechaCompra: new Date().toISOString(),
        estado: 'pagado',
        total: '129',
      
      };
  
      axios.post('http://localhost:8082/crearorden', nuevaOrden)
        .then(response => {
          navigate('/inicio');
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error al crear la orden:', error);
        });
    };

  

  const handleBuypaypal = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
    setShowPayPalmerca(true);
    setShowPayPalButtons(false)
  };

  return (
    <>
      <body>
        <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, "currency": "MXN" }}>
          <header className={styles.Cabecilla}>
            <p className={styles.Idioma}> México (Español)</p> 
            <div className="perfiles">
              <span className={styles.circulo}><img src={require('../images/user.svg')} alt="" /></span>
              <span className={styles.nombre}>Perfil</span>
            </div> 
          </header>

          <section className={styles.Ramt}>    
            <article className={styles.Mediante}>
              <Link className={styles.regreso} to='/inicio'>Regresar a Inicio</Link>
              <div className={styles.cajamedio}>
                <div className={styles.Par1}>
                  <p className={styles.Plan}>Tu plan</p>
                  <p className={styles.PILLS}>Cuenta Premium</p>
                  <img className={styles.logo} src={require('../images/Untitled.png')} alt="" />
                </div>
                <div className={styles.Par2}>
                  <p className={styles.PILL2}>A partir de Hoy</p>
                  <p className={styles.PILL2}>Próxima fecha de facturación</p>
                  <p className={styles.PILL2}>129,00 MXN al mes</p>
                  <p className={styles.PILL2}>21-Nov-23</p>
                  <div className={styles.Par3}>
                    <p className={styles.PILL3}>Luego, tu fecha de facturación será el 20 sep 2023</p>
                    <p className={styles.PILL3}>Cancela cuando quieras. Se aplican <a href="#" className="Ter">Términos de la oferta</a></p>
                  </div>
                </div>
              </div>
            </article>
            
            <section className={styles.button_container}>
              {/* Métodos de pagos: PayPal */}
              <h3 class={styles.titu}>Forma de Pago</h3>
              <button className={styles.par} onClick={handleBuypaypal}>
              <img className={styles.Pay} src={require('../images/paypal.jpeg')} alt="" />
                Comprar con PayPal
              </button>
              
              {showPayPalmerca && (
                <>
                  <PayPalButtons className={styles.pay}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: 129,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={handlePaymentApproval}
                    onError={(error) => {
                      console.error("Error al procesar el pago:", error);
                    }}
                  />
                </>
              )}
              
              <section className="par">
              <button className={styles.par} onClick={handleBuy}>
              <img className={styles.Pay} src={require('../images/mercado-pago.jpeg')} alt="" />
                Comprar con Mercado Pago
              </button>
              {showPayPalButtons && (
                <>
                  <Wallet initialization={{ preferenceId }} />
                </>
              )}
              </section>
            </section>
          </section>
        </PayPalScriptProvider>
      </body>
    </>
  );
}

export default Pago;