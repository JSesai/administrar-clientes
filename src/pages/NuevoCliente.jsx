import { useNavigate, Form, useActionData, redirect} from "react-router-dom"
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

//fn action de react router dom
export async function action({request}){
    const formData = await request.formData(); //request incluye el metodo formData tiene info del Form y la guarda en la const
    const datos = Object.fromEntries(formData); // convierte en objeto lo que se pasa como argumento 
    const email = formData.get('email');

    //validacion 
    const errores = [];
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios');
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
        errores.push('Correo invalido');
    }
    // console.log(errores);
    if(Object.keys(errores).length){
        return errores;
    }
    await agregarCliente(datos)
    return redirect('/');
}

function NuevoCliente() {
    const navigate = useNavigate();
    const errores = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Desde nuevo cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>
        <div className="flex justify-end">
            <button onClick={()=> navigate(-1)} className="bg-blue-800 text-white px-3 py-1 font-bold uppercase">
                Volver
            </button>
        </div>

        <div className="bg-white shadow rounded-md md:w-3/4 mt-20 mx-auto px-5 py-10">
            { errores?.length && errores.map((error, i)=> <Error key={i}> {error} </Error> )}
            <Form method="post" noValidate>

                <Formulario />
                <input  className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg" type="submit" value="Registrar Cliente" />
            </Form>
        </div>

    </>
  )
}

export default NuevoCliente
