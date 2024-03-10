import "./App.css";
import React, { useState } from "react";
import Start from "./assets/images/start.png";
import Reset from "./assets/images/reset.png";
import Stop from "./assets/images/stop.png";

let interval = null;
let [segundos, minutos, horas] = [0, 0, 0];
let [dSegundos, dMinutos, dHoras] = ["", "", ""];

function App() {
  const [timer, setTimer] = useState({
    horas: "00",
    minutos: "00",
    segundos: "00",
  });

  const displayAtual = () => {
    horas < 10 ? (dHoras = `0` + horas) : (dHoras = horas);
    minutos < 10 ? (dMinutos = `0` + minutos) : (dMinutos = minutos);
    segundos < 10 ? (dSegundos = `0` + segundos) : (dSegundos = segundos);

    setTimer({ horas: dHoras, minutos: dMinutos, segundos: dSegundos });
  };

  const timerFunction = () => {
    segundos++;
    if (segundos >= 60) {
      minutos += 1;
      segundos = 0;
    }
    if (minutos >= 60) {
      horas += 1;
      minutos = 0;
    }

    displayAtual();
  };

  const start = () => {
    if (interval) return;
    interval = setInterval(timerFunction, 1000);
  };

  const stop = () => {
    clearInterval(interval);
    interval = null;
  };

  const reset = () => {
    stop();
    setTimer({
      horas: "00",
      minutos: "00",
      segundos: "00",
    });
    [segundos, minutos, horas] = [0, 0, 0];
  };

  const footer = () => {
    return (
      <div className="footer">
        <h3>
          <span>
            Desenvolvido por{" "} 
            <a
              href="https://www.linkedin.com/in/yuridevops/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Yuri Souza
            </a>
          </span>
        </h3>
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <h1 unselectable="on">CRONOMETRO</h1>
        <h2>
          <span>{timer.horas}:</span>
          <span>{timer.minutos}:</span>
          <span>{timer.segundos}</span>
        </h2>
        <div className="buttons">
          <button
            className="start"
            onClick={() => {
              start();
            }}
          >
            <img src={Start} alt="inicio" />
          </button>
          <button
            className="stop"
            onClick={() => {
              stop();
            }}
          >
            <img src={Stop} alt="pause" />
          </button>
          <button
            className="reset"
            onClick={() => {
              reset();
            }}
          >
            <img src={Reset} alt="resetar" />
          </button>
        </div>
        {footer()}
      </div>
    </>
  );
}
export default App;
