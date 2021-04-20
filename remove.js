const fs = require('fs');
const rl = require('readline');
const readline = rl.createInterface(process.stdin, process.stdout);
const path = require('path');


let ruta = process.cwd();
console.log(process.cwd());
let count = 0

if(process.argv[2]!==undefined){
         ruta = './'+ process.argv[2];
}else{
        throw new Error('no especificó carpeta')
}

//async question
function question(query) {
    return new Promise(resolve => {
        readline.question(query, resolve);
    })
}

async function validation(){
    const answer = await question("this folder is not empty, Do you want to continue? [yes]/no: ");
    readline.close();
    return answer
}


async function main(){
    let filenames = fs.readdirSync(ruta)
    if(filenames.length>0){
        const answer = await validation()
        if(answer === 'yes'){
            remove(ruta)
        }else{
            console.log('nosh vemosh');
        }        
    }else{
        fs.rmdirSync(ruta)
    }
}

function remove(ruta){

    //contenido de la ruta
    let filenames = fs.readdirSync(ruta)
    //const filestat = fs.lstatSync(ruta); //investigar

    //CARPETA NO VACÍA
    if( filenames.length > 0){
    
            for(let i of filenames){
                const rutaDirectory = path.join(ruta ,i)
                //console.log(rutaDirectory);
                //Eliminar los que no son directorios
                if(!fs.statSync(rutaDirectory).isDirectory()){
                    count = count +1
                    fs.unlinkSync(rutaDirectory)
                }else{
                //PARA CADA ARCHIVO QUE SE ENCUENTRE EN LA RUTA PADRE
                remove(rutaDirectory)
                }
            }
        
            // actualizar para eliminar las carpetas padres
            filenames = fs.readdirSync(ruta)
        }
    
        //CARPETAS VACIAS 
        if ( filenames.length === 0) {
                fs.rmdirSync(ruta)
                count = count + 1

        }

}
console.log('total de archivos eliminados', count)

main()
