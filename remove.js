

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

let ruta = process.cwd();
console.log(process.cwd());
//console.log(process.argv[2]===undefined);

if(process.argv[2]!==undefined){
         ruta = './'+ process.argv[2];
}else{
        throw new Error('no especificó carpeta')
}

//async

function remove(ruta){
        //SABBER SI LA RUTA ES UN DIRECTORIO
        if(fs.lstatSync(ruta).isDirectory()){
                        console.log("yes1", ruta)
                      //CARPETAS VACIAS
                      if ( fs.readdirSync(ruta).length === 0) {
                                console.log("yes2")
                                fs.rmdir(ruta, (error) => {
                                        if (error) {
                                                console.log(error);
                                        }
                                        else {
                                        console.log("Empty Directories Deleted!");
                                        }
                                });


                        }
                        //CARPETA NO VACÍA
                        else{
                          fs.readdir(ruta,function (err,archivos){
                                if(err){
                                        console.log(err)
                                        return;
                                }
                                for(let i of archivos){
                                        //PARA CADA ARCHIVO QUE SE ENCUENTRE EN LA RUTA PADRE
                                        const rutaDirectory = ruta +"/"+i
                                        remove(rutaDirectory)
					console.log(rutaDirectory)
					
                                }
				
	                        			

                          })
			

			         
                        }

        }


}

remove(ruta);
