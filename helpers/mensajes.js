
const colors = require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.log("=========================".green);
    console.log("  Seleccione una opción  ".green);
    console.log("=========================\n".green);

    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tarea`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borar tarea`);
    console.log(`${"0.".green} Salir\n`);

    //CREANDO INTERFAZ PARA MOSTRAR Y RECIBIR INFORMACIÓN AL USUARIO
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opción: ", (opt) => {
      //   console.log({ opt });
      //DEBEMOS CERRAR EL READLINE SINO SE QUEDARÁ ESPERANDO QUE EL USUARIO INGRESE ALGO
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
