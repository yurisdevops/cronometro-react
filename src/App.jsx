import "./App.css";
import React, { useState } from "react";
import Start from "./assets/images/start.png";
import Reset from "./assets/images/reset.png";
import Stop from "./assets/images/stop.png";
import { Footer } from "./components/Footer";

function App() {
  // Estado inicial do cronômetro armazenando horas, minutos e segundos
  const [tempo, setTempo] = useState({
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  // Estado para armazenar o ID do intervalo de tempo
  const [cronometroId, setCronometroId] = useState(null);

  // Atualiza o tempo a cada segundo
  const atualizarTempo = () => {
    setTempo((prevTempo) => {
      let { horas, minutos, segundos } = prevTempo;

      segundos++; // Incrementa os segundos

      if (segundos >= 60) {
        // Verifica se precisa aumentar os minutos
        minutos++;
        segundos = 0;
      }
      if (minutos >= 60) {
        // Verifica se precisa aumentar as horas
        horas++;
        minutos = 0;
      }

      return { horas, minutos, segundos }; // Retorna novo estado atualizado
    });
  };

  // Inicia o cronômetro se ele já não estiver rodando
  const start = () => {
    if (cronometroId) return; // Evita múltiplos intervalos simultâneos
    const id = setInterval(atualizarTempo, 1000); // Atualiza o tempo a cada segundo
    setCronometroId(id);
  };

  // Para o cronômetro e limpa o intervalo
  const stop = () => {
    clearInterval(cronometroId);
    setCronometroId(null);
  };

  // Reseta o cronômetro, zerando os valores
  const reset = () => {
    stop(); // Para o cronômetro antes de resetar
    setTempo({ horas: 0, minutos: 0, segundos: 0 }); // Define o tempo como 00:00:00
  };

  // Formata números menores que 10 para exibição correta (ex: 09 em vez de 9)
  const formatarTempo = (num) => (num < 10 ? `0${num}` : num);

  return (
    <>
      <div className="container">
        <h1 unselectable="on">CRONOMETRO</h1>
        <h2>
          <span>{formatarTempo(tempo.horas)}:</span>
          <span>{formatarTempo(tempo.minutos)}:</span>
          <span>{formatarTempo(tempo.segundos)}</span>
        </h2>

        <div className="buttons">
          <button className="start" onClick={start}>
            <img src={Start} alt="Início" />
          </button>
          <button className="stop" onClick={stop}>
            <img src={Stop} alt="Pause" />
          </button>
          <button className="reset" onClick={reset}>
            <img src={Reset} alt="Resetar" />
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default App;
