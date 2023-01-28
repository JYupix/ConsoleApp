const fs = require("fs");


const archivo = "./db/data.json";

const guardarDB = (data) => {

    // const archivo = "./db/data.txt";

    //JSON.stringify convierte un objeto en string o json
    fs.writeFileSync(archivo, JSON.stringify(data));

}

const leerDB = () => {
    if(!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, {encoding: "utf-8"});
    //ME RETORNA UN STRING, DEBEMOS PARSEARLO
    // console.log(info);
    const data = JSON.parse(info);
    // console.log(data);

    return data;
}

module.exports = {
    guardarDB,
    leerDB,
}