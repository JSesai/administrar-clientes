//obtener todos los clientes
export async function obtenerClientes(){
    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    const resultado = await respuesta.json();
    return resultado;
}

//editar cliente
export async function obtenerCliente(id){
    //console.log(id)
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const resultado = await respuesta.json();
    //console.log(resultado);
    return resultado;
}

//agregar un cliente nuevo
export async function agregarCliente(datos){
    
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL,{
            method: 'post',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }

        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }
}

export async function actualizarCliente(id, datos){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'PUT',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}

export async function eliminarCliente(id){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'DELETE',
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}

