import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { io } from "socket.io-client";

export default function Juego() {
  const ref = useRef(null);

  useEffect(() => {
    const socket = io("http://192.168.0.106:3000");

    const engine = Matter.Engine.create();
    engine.world.gravity.y = 0;

    const render = Matter.Render.create({
      element: ref.current,
      engine,
      options: {
        width: 800,
        height: 500,
        wireframes: false,
        background: "#ffffff",
      },
    });

    const piso = Matter.Bodies.rectangle(400, 480, 800, 40, {
      isStatic: true,
      render: { fillStyle: "#ff8801" },
    });

    Matter.World.add(engine.world, piso);

    const bodies = {};

    socket.on("estado", (jugadores) => {
      for (const id in jugadores) {
        const j = jugadores[id];

        if (!bodies[id]) {
          const body = Matter.Bodies.rectangle(j.x, j.y, 50, 50, {
            render: {
              sprite: {
                texture: "/player.png",
                xScale: 0.5,
                yScale: 0.5,
              },
            },
          });

          bodies[id] = body;
          Matter.World.add(engine.world, body);
        }

        Matter.Body.setPosition(bodies[id], {
          x: j.x,
          y: j.y,
        });
      }

      Object.keys(bodies).forEach((id) => {
        if (!jugadores[id]) {
          Matter.World.remove(engine.world, bodies[id]);
          delete bodies[id];
        }
      });
    });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      socket.disconnect();
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return <div ref={ref} />;
}