import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import { motion } from "framer-motion";
import axios from "axios"; // Importar axios para realizar peticiones HTTP
import "../style/terrarioControl.css";

const TerrarioControl = () => {
  const [temperatura, setTemperatura] = useState(null);
  const [humedad, setHumedad] = useState(null);
  const [nivelComida, setNivelComida] = useState("Desconocido");
  const [movimiento, setMovimiento] = useState(false);
  const [estadoVentilador, setEstadoVentilador] = useState(false);
  const [estadoLampara, setEstadoLampara] = useState(false);
  const [cargandoActuador, setCargandoActuador] = useState(false);
  const [clienteMQTT, setClienteMQTT] = useState(null);
  const [dispositivoId, setDispositivoId] = useState("terrario-01"); // ID del dispositivo

  // URL de tu API
  const API_URL = "http://localhost:4000/api";

  // Función para guardar datos en MongoDB
  const guardarDatosEnMongoDB = async () => {
    try {
      const datosTerrario = {
        dispositivo_id: dispositivoId,
        temperatura: temperatura || 0,
        humedad: humedad || 0,
        luz: estadoLampara ? 1 : 0,
        ventilador: estadoVentilador ? 1 : 0,
        pir: movimiento ? 1 : 0
      };

      const respuesta = await axios.post(`${API_URL}/terrario/terrario-data`, datosTerrario);
      console.log("Datos guardados en MongoDB:", respuesta.data);
    } catch (error) {
      console.error("Error al guardar datos en MongoDB:", error);
    }
  };

  useEffect(() => {
    // Conectar al broker MQTT
    const client = mqtt.connect("ws://192.168.81.2:9001");

    client.on("connect", () => {
      console.log("Conectado al broker MQTT");
      client.subscribe("tortuTerra/temperature");
      client.subscribe("tortuTerra/humidity");
      client.subscribe("tortuTerra/foodLevel");
      client.subscribe("tortuTerra/turtleMoving");
      client.subscribe("tortuTerra/fanState");
      client.subscribe("tortuTerra/lampState");
    });

    client.on("message", (topico, mensaje) => {
      const datos = mensaje.toString();
      console.log(`Mensaje recibido en ${topico}:`, datos);

      switch (topico) {
        case "tortuTerra/temperature":
          setTemperatura(parseFloat(datos));
          break;
        case "tortuTerra/humidity":
          setHumedad(parseFloat(datos));
          break;
        case "tortuTerra/foodLevel":
          setNivelComida(datos);
          break;
        case "tortuTerra/turtleMoving":
          setMovimiento(datos === "true");
          break;
        case "tortuTerra/fanState":
          setEstadoVentilador(datos === "on");
          break;
        case "tortuTerra/lampState":
          setEstadoLampara(datos === "on");
          break;
        default:
          console.warn("Tema no reconocido:", topico);
      }
    });

    client.on("error", (error) => {
      console.error("Error en la conexión MQTT:", error);
    });

    setClienteMQTT(client);

    return () => {
      client.end();
    };
  }, []);

  // Efecto para guardar datos cuando cambian los valores de los sensores
  useEffect(() => {
    // Solo guardamos datos cuando tengamos al menos temperatura y humedad
    if (temperatura !== null && humedad !== null) {
      guardarDatosEnMongoDB();
    }
  }, [temperatura, humedad, estadoLampara, estadoVentilador, movimiento]);

  const controlarActuador = (actuador, accion) => {
    setCargandoActuador(true);
    const topico = `tortuTerra/${actuador}`;
    clienteMQTT.publish(topico, accion, (error) => {
      if (error) {
        console.error("Error al publicar:", error);
      } else {
        console.log(`Mensaje enviado: ${topico} -> ${accion}`);
        
        // También enviar el comando al servidor para control de actuadores
        axios.post(`${API_URL}/control`, { actuador, accion })
          .then(response => {
            console.log("Comando enviado al servidor:", response.data);
          })
          .catch(error => {
            console.error("Error al enviar comando al servidor:", error);
          });
      }
      setCargandoActuador(false);
    });
  };

  const dispensarComida = () => {
    setCargandoActuador(true);
    clienteMQTT.publish("tortuTerra/dispense", "activate", (error) => {
      if (error) {
        console.error("Error al publicar:", error);
      } else {
        console.log("Comida dispensada");
      }
      setCargandoActuador(false);
    });
  };

  return (
    <div className="terrario-control">
      <h1>Control del Terrario</h1>
      <div className="widgets">
        <motion.div
          className="widget"
          data-type="temperatura"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Temperatura</h2>
          <p>{temperatura !== null ? `${temperatura} °C` : "Cargando..."}</p>
        </motion.div>

        <motion.div
          className="widget"
          data-type="humedad"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Humedad</h2>
          <p>{humedad !== null ? `${humedad} %` : "Cargando..."}</p>
        </motion.div>

        <motion.div
          className="widget"
          data-type="comida"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Nivel de Comida</h2>
          <p>{nivelComida}</p>
          <button onClick={dispensarComida} disabled={cargandoActuador}>
            Dispensar Comida
          </button>
        </motion.div>

        <motion.div
          className="widget"
          data-type="movimiento"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2>Movimiento</h2>
          <p>{movimiento ? "Detectado" : "No detectado"}</p>
        </motion.div>

        <motion.div
          className="widget"
          data-type="ventilador"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2>Ventilador</h2>
          <p>{estadoVentilador ? "Encendido" : "Apagado"}</p>
          <button
            onClick={() => controlarActuador("fan", estadoVentilador ? "off" : "on")}
            disabled={cargandoActuador}
          >
            {estadoVentilador ? "Apagar Ventilador" : "Encender Ventilador"}
          </button>
        </motion.div>

        <motion.div
          className="widget"
          data-type="lampara"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2>Lámpara</h2>
          <p>{estadoLampara ? "Encendida" : "Apagada"}</p>
          <button
            onClick={() => controlarActuador("lamp", estadoLampara ? "off" : "on")}
            disabled={cargandoActuador}
          >
            {estadoLampara ? "Apagar Lámpara" : "Encender Lámpara"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TerrarioControl;