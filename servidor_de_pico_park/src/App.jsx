import { useState, useEffect } from "react";
import Juego from "../juego-borrador";

export default function App() {
  const [ip, setIp] = useState("");
  const [iniciar, setIniciar] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/ip")
      .then((res) => res.json())
      .then((data) => setIp(data.ip));
  }, []);

  if (iniciar && ip) {
    return <Juego ip={ip} />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>IP: {ip}</h2>
      <button onClick={() => setIniciar(true)}>Iniciar</button>
    </div>
  );
}