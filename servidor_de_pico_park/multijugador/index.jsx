let jugadores = {};

function agregarJugador(id) {
  jugadores[id] = { x: 0, y: 0 };
}

function moverJugador(id, data) {
  jugadores[id].x = data.x;
  jugadores[id].y = data.y;
}