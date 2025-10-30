import React, { useState, useEffect } from "react";

const Home = () => {
  const [lista, setLista] = useState([]);
  const [tarea, setTarea] = useState("");

  const API_URL = "https://playground.4geeks.com/todo/";

  const crearUsuario = () => {
    fetch(API_URL + "users/carlossan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) =>
        console.log("Hubo un problema al crear el usuario:\n", error)
      );
  };

  const traerLista = () => {
    fetch(API_URL + "users/carlossan")
      .then((response) => {
        if (response.status === 404) crearUsuario();
        return response.json();
      })
      .then((data) => setLista(data.todos))
      .catch((error) =>
        console.log("Hubo un problema al obtener la lista:\n", error)
      );
  };

  // const crearTarea = async (text) => {
  //   try {
  //     const response = await fetch(API_URL + "todos/carlossan", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ label: text, is_done: false }),
  //     });
  //     if (!response.ok)
  //       throw new error(`error ${response.status}: No se pudo crear la tarea`);
  //     await traerLista();
  //   } catch (error) {
  //     console.error("Hubo un problema al crear la tarea:", error);
  //   }
  // };

  const crearTarea = (text) => {
    fetch(API_URL + "todos/carlossan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: text, is_done: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setLista([...lista, data])
        }
      })
      .catch((error) => console.log("Hubo un error al crear la tarea:", error))
  }



  const eliminarTarea = async (id) => {
    try {
      const response = await fetch(API_URL + "todos/" + id, {
        method: "DELETE",
      });
      if (!response.ok) throw new error("No se pudo eliminar la tarea");
      await traerLista();
    } catch (error) {
      console.error(error);
    }
  };

  const inputText = (event) => {
    if (event.key === "Enter") {
      crearTarea(tarea);
      setTarea("");
    }
  };

  useEffect(() => {
    traerLista();
  }, []);

  return (
    <>
      <h1 className="big-title">todos</h1>
      <div className="text-center paper">
        <input
          className="ingreso-de-texto"
          type="text"
          placeholder="What needs to be done?"
          onChange={(e) => setTarea(e.target.value)}
          value={tarea}
          onKeyDown={inputText}
        />
        <ul className="list-unstyled texto-ingresado">
          {lista.map((item) => (
            <li key={item.id}>
              {item.label}
              <span onClick={() => eliminarTarea(item.id)}> ❌</span>
            </li>
          ))}
        </ul>
        <p className="counter">{lista.length} items left</p>
      </div>
    </>
  );
};

export default Home;
