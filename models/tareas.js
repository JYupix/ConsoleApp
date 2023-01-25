const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  //TRANSFORMANDO EL ARREGLO EN UN ARRAY
  //LO CONVERTIMOS EN UNA PROPIEDAD PERO ES UN GETTER
  get listadoArr(){
    const listado = [];

    //TRAER LAS LLAVES QUE SE ENCUENTRAN EN UN OBJETO
    //POR ESO SE USA UN METODO DE JS
    //EL OBJECT KEYS ES UN ARREGLO DE STRINGS
    Object.keys(this._listado).forEach((key)=>{
      const tarea = this._listado[key];
      listado.push(tarea);
    })

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if(this._listado[id]){
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []){
    tareas.forEach(tarea => {
      //Extraigo el ID, lo establezco en el objeto y luego lo igualo a la tarea.
      this._listado[tarea.id] = tarea;
    })
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto(){
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      // console.log(idx);
      const {desc, completadoEn} = tarea;
      const estado = (completadoEn) 
                      ? "Completada".green
                      : "Pendiente".red;
      console.log(`${idx} ${desc} :: ${estado}`);
    })
  }

  listarPendientesCompletadas(completadas = true){
    console.log();
    let contador = 0;
    this.listadoArr.forEach(tarea => {
      
      const {desc, completadoEn} = tarea;
      const estado = (completadoEn)
                      ? "Completada".green
                      : "Pendiente".red;
      if(completadas){
        //MOSTRAR COMPLETADAS
        if(completadoEn){
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${completadoEn.green}`);
        }
      }else{
        //MOSTRAR PENDIENTES
        if(!completadoEn){
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
        }
      }
    })
  }

  toggleCompletadas (ids = []){
    ids.forEach(id => {
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString();
      };
    });

    this.listadoArr.forEach(tarea => {
      //EN MI ARREGLO ESTÁ O EXISTE O INCLUYE ESE ID
      if(!ids.includes(tarea.id)){
        //UN MODO
        // const tarea = this._listado[id];
        // tarea.completadoEn = null;
        //OTRO MODO
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }

}

module.exports = Tareas;