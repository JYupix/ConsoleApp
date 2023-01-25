//----EJEMPLO DE COMO SE HACÍA MANUALMENTE EL MENU----//

// require("colors");
// const { mostrarMenu, pausa } = require("./helpers/mensajes");

// console.clear();

// const main = async () => {
//   //   console.log("Hola Mundo");

//   let opt = "";
//   do {
//     //Esperate hasta que tengamos una resolución de mostrar menú: eso hace el await
//     opt = await mostrarMenu();
//     console.log({ opt });

//     if (opt !== "0") await pausa();
//   } while (opt !== "0");

//   //   pausa();
// };

// main();

//----------------------------------------------------//
//----------------------------------------------------//
//--------------APLICACIÓN CON INQUIRER--------------//

// const { inquirerMenu, pausa } = require("./helpers/inquirer");
// const colors = require("colors");

// console.clear();

// const main = async () => {
//   let opt = "";
//   do {
//     opt = await inquirerMenu();
//     console.log({ opt });

//     console.log("\n");
//     await pausa();
//   } while (opt !== "0");

//   //   pausa();
// };

// main();

//----------------------------------------------------//
//----------------------------------------------------//
//------------------PRUEBA CON UUID------------------//
// const { inquirerMenu, pausa } = require("./helpers/inquirer");
// const colors = require("colors");
// const Tarea = require("./models/tarea");
// const Tareas = require("./models/tareas");

// console.clear();

// const main = async () => {
//   let opt = "";
//   do {
//     // opt = await inquirerMenu();
//     // console.log({ opt });

//     const tarea = new Tarea("Compra Comida");
//     const tareas = new Tareas();

//     tareas._listado[tarea.id] = tarea;

//     console.log(tareas);

//     await pausa();
//   } while (opt !== "0");

//   //   pausa();
// };

// main();


//----------------------------------------------------//
//----------------------------------------------------//
//------------------CREANDO UNA TAREA------------------//
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarlistadoCheckList } = require("./helpers/inquirer");
const colors = require("colors");
const Tareas = require("./models/tareas");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");


const main = async () => {

  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if(tareasDB){
    //Cargar las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //Crear Opción
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
      break;

      case "2":
        // console.log(tareas._listado);
        // console.log(tareas.listadoArr);
        tareas.listadoCompleto();
      break;

      case "3":
        tareas.listarPendientesCompletadas(true);
      break;

      case "4":
        tareas.listarPendientesCompletadas(false);
      break;

      case "5":
        //Completado | Pendiente
        const ids = await mostrarlistadoCheckList(tareas.listadoArr);
        // console.log(ids);
        tareas.toggleCompletadas(ids);
      break;

      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if(id !== "0"){
          // console.log({id});
          const ok = await confirmar("¿Está Seguro?");
          // console.log({ok});
          if(ok){
            tareas.borrarTarea(id);
            console.log("Tarea Borrada");
          }
        }
      break;

      case "0":
        
      break;
    
      default:
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");

    // pausa();
};

main();