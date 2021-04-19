const fs = require('fs');
let ruta = process.cwd(); 
console.log(process.cwd());
//console.log(process.argv[2]===undefined);

if(process.argv[2]!==undefined){
  	 ruta = './'+ process.argv[2];
}


//async
fs.readdir(ruta,function(err,archivos){
	if(err){
		console.log(err)
		return;
	}
	for(let i of archivos){
		const rutaDirectory = ruta +"/"+i
		//console.log(rutaDirectory)
		if(fs.lstatSync(rutaDirectory).isDirectory()){
			console.log(i+'/')
		}else{
		console.log(i);
		}
	}



});


 
