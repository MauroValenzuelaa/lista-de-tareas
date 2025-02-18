import { useState, useRef, useEffect } from "react";

export const useInfo = () => {
    const [tareas, setTareas] = useState(() => {
        // Cargar desde localStorage al iniciar
        const tareasGuardadas = localStorage.getItem("tareas");
        return tareasGuardadas ? JSON.parse(tareasGuardadas) : []; //Si tareasGuardadas tiene datos, se usa JSON.parse(savedTasks) para convertirlo en un array de objetos. Sino []
    }); // para guardar los valores y mostrar en la ul

    const [estado, setEstado] = useState(""); // para escribir en el input

    const [indice, setIndice] = useState(null); // para guardar los indices a eliminar
    const [pendientes, setPendientes] = useState(0); // tareas pendientes
    const inputRef = useRef(); // Creamos la referencia

    // Guardar en localStorage cuando cambian las tareas
    useEffect(() => {
        localStorage.setItem("tareas", JSON.stringify(tareas));
        setPendientes(tareas.filter((t) => !t.completado).length);
    }, [tareas]);

    const escribiendo = ({ target }) => {
        setEstado(target.value);
    };

    const agregarTarea = () => {
        if (estado.trim() !== "") {
            if (indice !== null) {
                const nuevasTareas = [...tareas]; // Copia del array
                nuevasTareas[indice].texto = estado; // Reemplazo con la edición
                setTareas(nuevasTareas);
                setIndice(null);
            } else {
                setTareas([...tareas, { texto: estado, completado: false }]); // Agregar nueva tarea
                setPendientes(pendientes + 1);
            }
            setEstado(""); // Limpiar input
            inputRef.current.focus(); // Enfocar input automáticamente
        }
    };

    const eliminar = (index) => {
        setTareas(tareas.filter((_, i) => i !== index));
        setPendientes(pendientes - 1);
    };

    const editar = (index) => {
        setIndice(index); // Guardar el índice de la tarea a editar
        setEstado(tareas[index].texto); // Cargar la tarea en el input
        inputRef.current.focus(); // Enfocar el input
    };

    const tachar = (index) => {
        const nuevasTareas = [...tareas];
        nuevasTareas[index].completado = !nuevasTareas[index].completado;
        setPendientes(
            nuevasTareas[index].completado ? pendientes - 1 : pendientes + 1
        );
        setTareas(nuevasTareas);
    };

    return {
        estado,
        tareas,
        indice,
        pendientes,
        inputRef,
        escribiendo,
        agregarTarea,
        eliminar,
        editar,
        tachar,
    };
};
