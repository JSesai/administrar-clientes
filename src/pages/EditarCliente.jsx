
import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader({params}){
    const cliente =  await obtenerCliente(params.clienteId);
    //console.log(cliente);
    if(Object.values(cliente).length === 0){
        throw new Response('', {
            status: 400,
            statusText: 'Cliente no encontrando'
        });
    }
     return cliente;
}

export async function action ({request, params}){
    const formData = await request.formData(); //request incluye el metodo formData tiene info del Form y la guarda en la const
    const datos = Object.fromEntries(formData); // convierte en objeto lo que se pasa como argumento 
    //console.log(datos);
    const email = formData.get('email');

    //validacion 
    const errores = [];
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios');
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){ //validacion de correo con la expresion regular
        errores.push('Correo invalido'); //agrega error al arreglo de errores
    }
    // console.log(errores);
    if(Object.keys(errores).length){ //si hay errores 
        return errores; //retorna errores
    }
    //actualiza los datos del cliente
    await actualizarCliente(params.clienteId, datos) //
    return redirect('/');
}

function EditarCliente() {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Modifica los datos del cliente</p>
        <div className="flex justify-end">
            <button onClick={()=> navigate(-1)} className="bg-blue-800 text-white px-3 py-1 font-bold uppercase">
                Volver
            </button>
        </div>

        <div className="bg-white shadow rounded-md md:w-3/4 mt-20 mx-auto px-5 py-10">
            { errores?.length && errores.map((error, i)=> <Error key={i}> {error} </Error> )}
            <Form method="post" noValidate>

                <Formulario cliente ={cliente} />
                <input  className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg" type="submit" value="Actualizar Cliente" />
            </Form>
        </div>

    </>
  )
}

export default EditarCliente
