import React, { useState, Useeffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";



//create your first component
const Home = () => {
	let [lista, setLista] = useState([])
	let [tarea, setTarea] = useState("")

	const API_URL = 'https://playground.4geeks.com/todo/'
	
	const crearUsuario = () => {
		fetch (API_URL + "users/carlossan", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},			
		})
			.then(response => response.json())
			.then ((data) => console.log(data))
			.catch (error => { console.log('Hubo un problema al crear el usuario: \n', error) })
	}
	
	const crearTarea = async (text) => {
		try {
			const response = await fetch(API_URL) + "todos"
		}
	}
	const agregar = (event) => {
		if (event.key === "Enter") {
			setLista([...lista, tarea])
			setTarea("")
		}

	}
	const eliminarTarea = (posicion) => {
		setLista(lista.filter((item, index) => index !== posicion))
	}

	return (
		<>
			<h1 className="big-title">todos</h1>
			<div className="text-center paper ">
				<input className="ingreso-de-texto" type="text" placeholder="What needs to be done?" onChange={escribirTarea} value={tarea} onKeyDown={agregar} />
				<ul className="list-unstyled texto-ingresado">
					{lista.map((item, index) => (<li key={index}>{item}<span onClick={() => eliminarTarea(index)}> ❌</span></li>))}

				</ul>
				<p className="counter">{lista.length} items left</p>
			</div>
		</>

	);
};

export default Home;