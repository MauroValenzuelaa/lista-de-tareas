import { useInfo } from "../hooks/useInfo";
import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";

export const TodoList = () => {
    const {
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
    } = useInfo();

    return (
        <>
            <div className="bg-white w-95 md:w-2xl lg:w-xl h-auto rounded-2xl pb-3 overflow-hidden min-h-50">
                <div className="w-full flex justify-center items-center gap-2">
                    <h1 className="text-center mb-6 text-4xl font-darumadrop mt-5">
                        LISTA DE TAREAS
                    </h1>
                    <img
                        src="./tarea.gif"
                        alt="Icono de una lista de tareas"
                        className="w-10 h-10"
                    />
                </div>
                <div className="flex gap-4 items-center">
                    <p className="mb-5 ml-5 font-bold">
                        Tareas pendientes:{" "}
                        <span className="text-green-500">{pendientes}</span>
                    </p>
                    <p className="text-green-500 text-sm mb-5 ml-5 font-bold animate-bounce">
                        {indice !== null ? "Confirmar cambios.." : ""}
                    </p>
                </div>
                <div className="flex justify-center pb-2">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Añada su tarea.."
                        className="bg-gray-100 text-black rounded-full p-2 pl-3 border border-gray-200 w-full ml-4 outline-none"
                        value={estado}
                        onChange={escribiendo}
                        onKeyDown={(e) => e.key === "Enter" && agregarTarea()} // ✅ Detectar Enter
                    />
                    <button
                        className={`px-2 py-1 ml-2 ${
                            indice !== null
                                ? "bg-green-500 active:bg-green-600"
                                : "bg-blue-600 active:bg-blue-700"
                        } text-white mr-3 rounded-full active:scale-95 transition-all ease-in-out hover:scale-110 cursor-pointer`}
                        onClick={agregarTarea}
                    >
                        {indice !== null ? (
                            <PlusIcon className="h-7 w-7"></PlusIcon>
                        ) : (
                            <PlusIcon className="h-7 w-7"></PlusIcon>
                        )}
                    </button>
                </div>
                <ul className="overflow-auto max-h-90">
                    {tareas.map((tarea, index) => (
                        <li
                            key={index}
                            className={`my-3 mx-5 p-3 pl-3 bg-gray-100 rounded text-black cursor-pointer ${
                                tarea.completado
                                    ? "line-through text-gray-500"
                                    : ""
                            } flex justify-between items-center hover:scale-103 transition-all ease-in animate-fade-down animate-duration-[700ms] active:scale-95 md:active:scale-95 lg:active:scale-103`}
                            onClick={() => tachar(index)}
                        >
                            <span className="break-words w-[70%] md:w-[85%] lg:w-[80%] font-semibold">
                                {tarea.texto}
                            </span>
                            <div>
                                <button
                                    className="px-2 text-green-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        editar(index);
                                    }}
                                    disabled={indice !== null} // Bloquea mientras se edita
                                >
                                    <PencilIcon className="h-6 w-6 cursor-pointer active:scale-95 active:text-green-700 transition-all ease-in-out"></PencilIcon>
                                </button>
                                <button
                                    className="px-2 text-white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        eliminar(index);
                                    }}
                                    disabled={indice !== null} // Bloquea mientras se edita
                                >
                                    <TrashIcon className="h-7 w-7 text-red-600 cursor-pointer active:scale-95 active:text-red-700 transition-all ease-in-out" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

//anterior
