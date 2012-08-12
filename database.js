	//me estoy reportanto ahora espero lo veas
	
	var db = null;
	var namedatabase = "db.0.0.4.5";
	var dbversion = '1.1';
	var displayName = 'My Database';
	//==========================================================================================================
	//========							  Llenar Lista  					====================================
	//==========================================================================================================
	
	function Logeo() {
		if(document.getElementById("txtlogin").value=="trivia2012"){
			location.href = 'menuAdmin.html';
		}else{
			alert("Ingrese el pin correcto");
		}
	}
	

	
	function iniciarapp(){
		
		// create/open database
		db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);
                if (db) {					
                    db.transaction(function (tx) {
						// If table not exsist create it
						tx.executeSql("CREATE TABLE IF NOT EXISTS PREGUNTA 			(id integer primary key autoincrement, pregunta text, genero text)");
						tx.executeSql("CREATE TABLE IF NOT EXISTS RESPUESTA			(id int, idpregunta int, respuesta text)");
						tx.executeSql("CREATE TABLE IF NOT EXISTS RESPUESTAC 	    (id integer primary key autoincrement, idpregunta int, respuestac text)");
						tx.executeSql("CREATE TABLE IF NOT EXISTS RESPUESTAU 		(id integer primary key autoincrement, idpregunta int, respuestau text)");
						tx.executeSql("CREATE TABLE IF NOT EXISTS TEMPORAL 	(id int unique, idtemporal int)"); 
						tx.executeSql("CREATE TABLE IF NOT EXISTS RANDOM (id integer primary key autoincrement, idrandom int)");
						tx.executeSql("CREATE TABLE IF NOT EXISTS MODO 				(id int unique,tipomodo int)");
						tx.executeSql("INSERT INTO MODO(id,tipomodo)values(?,?)", [1,5]); 
						tx.executeSql("INSERT INTO TEMPORAL (id,idtemporal) VALUES (?,?)", [1,1]);
						//tx.executeSql('DROP TABLE RESPUESTAU', []);
						//tx.executeSql('DROP TABLE RANDOM', []);
						});
				}
			
				
	}
	

	//==========================================================================================================
	//========							  GuardarPregunta  					====================================
	//==========================================================================================================
	
	function guardarPregunta() {
		if(document.getElementById("txtpregunta").value.length>0){
				if(document.getElementById("txtrespuesta1").value.length>0 && document.getElementById("txtrespuesta2").value.length>0 &&
				   document.getElementById("txtrespuesta3").value.length>0 && document.getElementById("txtrespuesta4").value.length>0){
						if(document.getElementById("rdo1").checked  || document.getElementById("rdo2").checked || 
						document.getElementById("rdo3").checked   || document.getElementById("rdo4").checked){	
								try{
									
											
											var varpregunta = document.getElementById("txtpregunta").value;	
											var varrespuesta1 = document.getElementById("txtrespuesta1").value;	
											var varrespuesta2 = document.getElementById("txtrespuesta2").value;
											var varrespuesta3 = document.getElementById("txtrespuesta3").value;
											var varrespuesta4 = document.getElementById("txtrespuesta4").value;
											var vargenero = document.getElementById("txtgenero").value;
											var varidpregunta;
											
											
											db.transaction(function(ax){		
													
													
													ax.executeSql("INSERT into PREGUNTA(pregunta,genero)values(?,?)", [varpregunta,vargenero]);	
														
													
													ax.executeSql("SELECT id FROM PREGUNTA order by id desc limit 1",[], function (ax, results) {
														varidpregunta = results.rows.item(0).id;
														alert("Pregunta "+ varidpregunta +" guardada..");
															
													ax.executeSql("insert into RESPUESTA(id,respuesta,idpregunta)values(?,?,?)", [1,varrespuesta1,varidpregunta]);
													ax.executeSql("insert into RESPUESTA(id,respuesta,idpregunta)values(?,?,?)", [2,varrespuesta2,varidpregunta]);
													ax.executeSql("insert into RESPUESTA(id,respuesta,idpregunta)values(?,?,?)", [3,varrespuesta3,varidpregunta]);
													ax.executeSql("insert into RESPUESTA(id,respuesta,idpregunta)values(?,?,?)", [4,varrespuesta4,varidpregunta]);					
													
													
													if(document.getElementById("rdo1").checked){
													ax.executeSql("insert into RESPUESTAC(idpregunta,respuestac)values(?,?)", [varidpregunta,"resp1"]);
																
														}else if(document.getElementById("rdo2").checked){
														ax.executeSql("insert into RESPUESTAC(idpregunta,respuestac)values(?,?)", [varidpregunta,"resp2"]);
																	
															}else if(document.getElementById("rdo3").checked){
															ax.executeSql("insert into RESPUESTAC(idpregunta,respuestac)values(?,?)", [varidpregunta,"resp3"]);
																			
																}else if(document.getElementById("rdo4").checked){
																ax.executeSql("insert into RESPUESTAC(idpregunta,respuestac)values(?,?)", [varidpregunta,"resp4"]);
																			
																}
													
													
												});	
											});/**		
											document.getElementById("rdo1").checked = "";
											document.getElementById("rdo2").checked = "";
											document.getElementById("rdo3").checked = "";
											document.getElementById("rdo4").checked = "";*/
											document.getElementById("txtpregunta").value="";	
											document.getElementById("txtrespuesta1").value="";	
											document.getElementById("txtrespuesta2").value="";
											document.getElementById("txtrespuesta3").value="";
											document.getElementById("txtrespuesta4").value="";
												
									}catch(error){
									alert(error);
									}
							}else{
							alert("Seleccione la respuesta correcta");
							}		
				}else{
				alert("Ingrese todas las respuestas");
				}
		}else{
	  alert("Ingrese primero la pregunta");
	  }
	}
	

	//==========================================================================================================
	//========							  Elemento Lista																			===================================
	//==========================================================================================================			
					
	function listaPregunta() {
		var ele = document.getElementById("tableLista");
		var output = "";
		db = openDatabase(namedatabase, dbversion, 'Test', 50 * 1024);
			db.transaction(function (tx) {
			tx.executeSql("SELECT id,pregunta from PREGUNTA",null, function (ax, results) {
		
			for(var i=0;i<results.rows.length;i+=1){
			var varid =results.rows.item(i).id;
				output += 
	"<tr>"+
		"<td style='font-size:20px'>"+results.rows.item(i).pregunta+"<td>"+
		"<td align='right' width='40'><img src='img/pencil.png' onClick='mover("+varid+")' width='24' height='24' /></td>"+
		"<td align='right' width='40'><img src='img/logout.png' onClick='eliminarPregunta("+varid+")' width='24' height='24' /></td>"+
	"</tr>"
				}
				ele.innerHTML = output;
					
			});
		});
		}
		
	//==========================================================================================================
	//========							  Modificar elemento Lista			 										===================================
	//==========================================================================================================
		

		function mover(varid) {

          		db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);      

					
                    db.transaction(function (tx) {
						// If table not exsist create it
                      
							tx.executeSql("CREATE TABLE IF NOT EXISTS TEMPORAL 	(id int unique, idtemporal int)");
               
                                tx.executeSql("UPDATE TEMPORAL SET idtemporal =? where id = ?", [varid,1]);

								location.href = 'preguntaModificar.html';
                            

						});
						
	
		}
		
		
	//==========================================================================================================
	//========							  Eliminar elemento Lista			===================================
	//==========================================================================================================
		function eliminarPregunta(varid) {
		
		db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);				
                    db.transaction(function (tx) {
									tx.executeSql('DELETE FROM PREGUNTA WHERE id = ?', [varid]);
									tx.executeSql('DELETE FROM RESPUESTA WHERE idpregunta = ?', [varid]);
									tx.executeSql('DELETE FROM RESPUESTAC WHERE idpregunta = ?', [varid]);
									
									alert("La pregunta se ha eliminado correctamente");
									location.href = 'preguntaLista.html';	
									});
					
			
	}
	
	//==========================================================================================================
	//========							  Modificar Pregunta				===================================
	//==========================================================================================================
	
		function mostrarPregunta() {
		
			var idtemp
		db = openDatabase(namedatabase, dbversion, 'Test', 50 * 1024);	
		
		db.transaction(function(vx){
			
		
			vx.executeSql("SELECT idtemporal FROM TEMPORAL WHERE id = ?", [1], function (vx, results)
			{		
				idtemp = results.rows.item(0).idtemporal;
				

				vx.executeSql("SELECT pregunta FROM PREGUNTA WHERE id = ?", [idtemp], function (vx, results)
				{	
						
						document.getElementById("txtpregunta").value = results.rows.item(0).pregunta;

				});
				
				
				
				vx.executeSql("SELECT respuesta FROM RESPUESTA  WHERE idpregunta = ?", [idtemp], function (ax, results)
				{
				
						document.getElementById("txtrespuesta1").value = results.rows.item(0).respuesta;
						document.getElementById("txtrespuesta2").value = results.rows.item(1).respuesta;
						document.getElementById("txtrespuesta3").value = results.rows.item(2).respuesta;
						document.getElementById("txtrespuesta4").value = results.rows.item(3).respuesta;
				
				});
			
				
			});	
		});
						
	}

	
	//==========================================================================================================
	//========							  Modificar elemento Lista																===================================
	//==========================================================================================================
		
		function moddata() {
				if(document.getElementById("txtpregunta").value.length>0){
		if(document.getElementById("txtrespuesta1").value.length>0 && document.getElementById("txtrespuesta2").value.length>0 &&
		   document.getElementById("txtrespuesta3").value.length>0 && document.getElementById("txtrespuesta4").value.length>0){
			if(document.getElementById("rdo1").checked  || document.getElementById("rdo2").checked || 
				document.getElementById("rdo3").checked   || document.getElementById("rdo4").checked){	
						try{
	                var idtemp;
	
			var varpregunta = document.getElementById("txtpregunta").value;	
									var varrespuesta1 = document.getElementById("txtrespuesta1").value;	
									var varrespuesta2 = document.getElementById("txtrespuesta2").value;
									var varrespuesta3 = document.getElementById("txtrespuesta3").value;
									var varrespuesta4 = document.getElementById("txtrespuesta4").value;
											
	
			 
			 
			 
			 
			db.transaction(function (qx) {
				qx.executeSql("SELECT idtemporal FROM TEMPORAL where id =? ", [1], function (qx, results) 
				{
							idtemp = results.rows.item(0).idtemporal;								
						
				 
							
											qx.executeSql("UPDATE PREGUNTA SET pregunta = ? WHERE id = ? ", [varpregunta, idtemp]);
									
										
											
													
			
			
			 

											qx.executeSql("UPDATE PREGUNTA SET pregunta = ? WHERE id = ? ", [varpregunta, idtemp]);
											qx.executeSql("UPDATE RESPUESTA SET respuesta = ? WHERE id= ? and idpregunta = ? ", [varrespuesta1, 1,idtemp]);
											qx.executeSql("UPDATE RESPUESTA SET respuesta = ? WHERE id= ? and idpregunta = ? ", [varrespuesta2, 2,idtemp]);
											qx.executeSql("UPDATE RESPUESTA SET respuesta = ? WHERE id= ? and idpregunta = ? ", [varrespuesta3, 3,idtemp]);
											qx.executeSql("UPDATE RESPUESTA SET respuesta = ? WHERE id= ? and idpregunta = ? ", [varrespuesta4, 4,idtemp]);
											
											
											
										
			
								if(document.getElementById("rdo1").checked){
													qx.executeSql("UPDATE RESPUESTAC SET respuestac  = ? WHERE idpregunta = ? ", ["resp1", idtemp]);
																
														}else if(document.getElementById("rdo2").checked){
														qx.executeSql("UPDATE RESPUESTAC SET respuestac  = ? WHERE idpregunta = ? ", ["resp2",idtemp]);
																	
															}else if(document.getElementById("rdo3").checked){
															qx.executeSql("UPDATE RESPUESTAC SET respuestac  = ? WHERE idpregunta = ? ", ["resp3",idtemp]);
																			
																}else if(document.getElementById("rdo4").checked){
																qx.executeSql("UPDATE RESPUESTAC SET respuestac  = ? WHERE idpregunta = ? ", ["resp4",idtemp]);
																			
																}
			
				});
				location.href = 'preguntaLista.html'
			});
												
				/*
												db.transaction(function (dx) {
														dx.executeSql('DELETE FROM TEMPORAL', []);
														;	
												});	
										*/		
													
									}catch(error){
									alert(error);
									}
							}else{
							alert("Seleccione la respuesta correcta");
							}		
				}else{
				alert("Ingrese todas las respuestas");
				}
		}else{
	  alert("Ingrese primero la pregunta");
	  }
												
											
	}
	
	//===============
db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024); 
	function eliminarTemporal(){
	db.transaction(function (dx) {
		dx.executeSql('DELETE FROM TEMPORAL WHERE id = ?', [1]);
		//location.href = 'preguntaLista.html';
	});	
	}
	//===============
	
	//==========================================================================================================
	//========							  Eliminar todo			===================================
	//==========================================================================================================
		function eliminarTodo() {
		
		db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);				
                    db.transaction(function (tx) {
									tx.executeSql('DROP TABLE  PREGUNTA', []);
									tx.executeSql('DROP TABLE  RESPUESTA ', []);
									tx.executeSql('DROP TABLE  RESPUESTAC', []);
									tx.executeSql('DROP TABLE  RESPUESTAU', []);
									alert("Todo se ha eliminado correctamente");
									location.href = 'preguntaLista.html';	
									});
					
			
	}
	//==========================================================================================================
	//========							 GUARDAR EL MODO DE JUEGO			===================================
	//==========================================================================================================
	
function numeroRandom(){ 
db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	
	db.transaction(function (wx) {
		if(document.getElementById("rdo1").checked){
			wx.executeSql("UPDATE MODO SET tipomodo = ? WHERE id = ? ", [5,1]);
				location.href = 'menuAdmin.html';				
			}else if(document.getElementById("rdo2").checked){
					wx.executeSql("UPDATE MODO SET tipomodo = ? WHERE id = ? ", [10,1]);
						location.href = 'menuAdmin.html';						
				}else{
				alert("Seleccione un numero de preguntas");
				}
			
	});


}



	//==========================================================================================================
	//========							 TRAER DATOS DE LA TABLA MODO			===================================
	//==========================================================================================================
	

function pasardatos(){

db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);
		db.transaction(function (tx) {
						
						tx.executeSql("SELECT tipomodo FROM MODO ", [], function (ax, results) 
						{
						
						 var numero = results.rows.item(0).tipomodo;
								tx.executeSql('DROP TABLE  RANDOM', []);
						random(numero);
						
						});
						
					 });
					

}
	//==========================================================================================================
	//========							 CREAR RANDOM			===================================
	//==========================================================================================================

 function random(numero){
var numAleatorios = [];
 db.transaction(function (tx) {
				tx.executeSql("SELECT id FROM PREGUNTA order by id desc limit 1",[], function (ax, results) {
					var varmax = results.rows.item(0).id;
 
var max = varmax;
var aleatorio = 0;  
db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);      
		
       
                    tx.executeSql("CREATE TABLE IF NOT EXISTS RANDOM (id integer primary key autoincrement, idrandom int)");
tx.executeSql("CREATE TABLE IF NOT EXISTS RESPUESTAU 		(id integer primary key autoincrement, idpregunta int, respuestau text)");
for (i = 0; i < numero; i++){
do {
aleatorio = Math.floor((Math.random()*max)+1);
} while ($.inArray(aleatorio,numAleatorios)!="-1"); 

numAleatorios.push(aleatorio);
					
                      tx.executeSql("INSERT INTO RANDOM (idrandom) VALUES (?)", [aleatorio]);
					  
}
location.href = 'pregunta1.html';	

});	
});	
}
	
	
	
function llenarDatos0() {

		db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	

                    db.transaction(function (rx) {
						rx.executeSql("SELECT idrandom FROM RANDOM ", [], function (rx, results) 
						{
				   
						 idrand = results.rows.item(0).idrandom;
						
								
						});
					 });
					 
					 
					 
		db.transaction(function(ax){
			ax.executeSql("SELECT pregunta,genero FROM PREGUNTA WHERE id = ?", [idrand], function (ax, results)
			{	
			
					if (results.rows.length == 1) {
					document.getElementById("txtpregunta").value = results.rows.item(0).pregunta;
					document.getElementById("txtgenero").value = results.rows.item(0).genero;
					}
			});
			
			
			
			ax.executeSql("SELECT respuesta FROM RESPUESTA WHERE idpregunta = ?", [idrand], function (ax, results)
			{
			
					document.getElementById("txtrespuesta1").value = results.rows.item(0).respuesta;
					document.getElementById("txtrespuesta2").value = results.rows.item(1).respuesta;
					document.getElementById("txtrespuesta3").value = results.rows.item(2).respuesta;
					document.getElementById("txtrespuesta4").value = results.rows.item(3).respuesta;

			});
			
						

		});	
					
	
	
						
	
	}
	

	function pasar0() {
			db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	
			
	 db.transaction(function (ax) {
						ax.executeSql("SELECT idrandom FROM RANDOM ", [], function (ax, results) 
						{
						var idrand0 = results.rows.item(0).idrandom;
					
				if(document.getElementById("rdo1").checked){
			ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp1"]);
					location.href = 'pregunta2.html';
			}else if(document.getElementById("rdo2").checked){
			ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp2"]);
						location.href = 'pregunta2.html';
				}else if(document.getElementById("rdo3").checked){
				ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp3"]);
								location.href = 'pregunta2.html';
					}else if(document.getElementById("rdo4").checked){
					ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp4"]);
					location.href = 'pregunta2.html';
					}else{
				alert("seleccione una respuesta");
				}
				});		
		});
					
	}
	
	function llenarDatos1() {
	

	var numero =1;
		db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	

                    db.transaction(function (rx) {
						rx.executeSql("SELECT idrandom FROM RANDOM ", [], function (rx, results) 
						{
				   
						 idrand = results.rows.item(1).idrandom;
						
								
						});
					 });
					 
					 
					 
		db.transaction(function(ax){
			ax.executeSql("SELECT pregunta,genero FROM PREGUNTA WHERE id = ?", [idrand], function (ax, results)
			{	
			
					if (results.rows.length == 1) {
					document.getElementById("txtpregunta").value = results.rows.item(0).pregunta;
					document.getElementById("txtgenero").value = results.rows.item(0).genero;
					}
			});
			
			
			
			ax.executeSql("SELECT respuesta FROM RESPUESTA WHERE idpregunta = ?", [idrand], function (ax, results)
			{
			
					document.getElementById("txtrespuesta1").value = results.rows.item(0).respuesta;
					document.getElementById("txtrespuesta2").value = results.rows.item(1).respuesta;
					document.getElementById("txtrespuesta3").value = results.rows.item(2).respuesta;
					document.getElementById("txtrespuesta4").value = results.rows.item(3).respuesta;

			});
			

		});	
					
	}
function pasar1() {
			db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	
			
	 db.transaction(function (ax) {
						ax.executeSql("SELECT idrandom FROM RANDOM ", [], function (ax, results) 
						{
						idrand0 = results.rows.item(1).idrandom;
					
				if(document.getElementById("rdo1").checked){
			ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp1"]);
					location.href = 'pregunta3.html';
			}else if(document.getElementById("rdo2").checked){
			ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp2"]);
						location.href = 'pregunta3.html';
				}else if(document.getElementById("rdo3").checked){
				ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp3"]);
								location.href = 'pregunta3.html';
					}else if(document.getElementById("rdo4").checked){
					ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp4"]);
					location.href = 'pregunta3.html';
					}else{
				alert("seleccione una respuesta");
				}
				});		
		});
					
	}
	
	function llenarDatos2() {
	

var numero =1;
		db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	

                    db.transaction(function (rx) {
						rx.executeSql("SELECT idrandom FROM RANDOM ", [], function (rx, results) 
						{
				   
						 idrand = results.rows.item(2).idrandom;
						
								
						});
					 });
					 
					 
					 
		db.transaction(function(ax){
			ax.executeSql("SELECT pregunta,genero FROM PREGUNTA WHERE id = ?", [idrand], function (ax, results)
			{	
			
					if (results.rows.length == 1) {
					document.getElementById("txtpregunta").value = results.rows.item(0).pregunta;
					document.getElementById("txtgenero").value = results.rows.item(0).genero;
					}
			});
			
			
			
			ax.executeSql("SELECT respuesta FROM RESPUESTA WHERE idpregunta = ?", [idrand], function (ax, results)
			{
			
					document.getElementById("txtrespuesta1").value = results.rows.item(0).respuesta;
					document.getElementById("txtrespuesta2").value = results.rows.item(1).respuesta;
					document.getElementById("txtrespuesta3").value = results.rows.item(2).respuesta;
					document.getElementById("txtrespuesta4").value = results.rows.item(3).respuesta;

			});
			

		});	
					
	}
	
	function pasar2() {
			db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	
			
	 db.transaction(function (ax) {
						ax.executeSql("SELECT idrandom FROM RANDOM ", [], function (ax, results) 
						{
						idrand0 = results.rows.item(2).idrandom;
					
				if(document.getElementById("rdo1").checked){
			ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp1"]);
					location.href = 'pregunta4.html';
			}else if(document.getElementById("rdo2").checked){
			ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp2"]);
						location.href = 'pregunta4.html';
				}else if(document.getElementById("rdo3").checked){
				ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp3"]);
								location.href = 'pregunta4.html';
					}else if(document.getElementById("rdo4").checked){
					ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp4"]);
									location.href = 'pregunta4.html';
					}else{
				alert("seleccione una respuesta");
				}
				});		
		});
					
	}
	function llenarDatos3() {
	

	var numero =1;
		db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	

                    db.transaction(function (rx) {
						rx.executeSql("SELECT idrandom FROM RANDOM ", [], function (rx, results) 
						{
				   
						 idrand = results.rows.item(3).idrandom;
						
								
						});
					 });
					 
					 
					 
		db.transaction(function(ax){
			ax.executeSql("SELECT pregunta,genero FROM PREGUNTA WHERE id = ?", [idrand], function (ax, results)
			{	
			
					if (results.rows.length == 1) {
					document.getElementById("txtpregunta").value = results.rows.item(0).pregunta;
					document.getElementById("txtgenero").value = results.rows.item(0).genero;
					}
			});
			
			
			
			ax.executeSql("SELECT respuesta FROM RESPUESTA WHERE idpregunta = ?", [idrand], function (ax, results)
			{
			
					document.getElementById("txtrespuesta1").value = results.rows.item(0).respuesta;
					document.getElementById("txtrespuesta2").value = results.rows.item(1).respuesta;
					document.getElementById("txtrespuesta3").value = results.rows.item(2).respuesta;
					document.getElementById("txtrespuesta4").value = results.rows.item(3).respuesta;

			});
			

		});	
					
	}
		function pasar3() {
			db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	
			
	 db.transaction(function (ax) {
						ax.executeSql("SELECT idrandom FROM RANDOM ", [], function (ax, results) 
						{
						idrand0 = results.rows.item(3).idrandom;
					
				if(document.getElementById("rdo1").checked){
			ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp1"]);
					location.href = 'pregunta5.html';
			}else if(document.getElementById("rdo2").checked){
			ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp2"]);
						location.href = 'pregunta5.html';
				}else if(document.getElementById("rdo3").checked){
				ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp3"]);
								location.href = 'pregunta5.html';
					}else if(document.getElementById("rdo4").checked){
					ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp4"]);
									location.href = 'pregunta5.html';
					}else{
				alert("seleccione una respuesta");
				}
				});		
		});
					
	}
	
function llenarDatos4() {
	

	var numero =1;
		db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	

                    db.transaction(function (rx) {
						rx.executeSql("SELECT idrandom FROM RANDOM ", [], function (rx, results) 
						{
				   
						 idrand = results.rows.item(4).idrandom;
						
								
						});
					 });
					 
					 
					 
		db.transaction(function(ax){
			ax.executeSql("SELECT pregunta,genero FROM PREGUNTA WHERE id = ?", [idrand], function (ax, results)
			{	
			
					if (results.rows.length == 1) {
					document.getElementById("txtpregunta").value = results.rows.item(0).pregunta;
					document.getElementById("txtgenero").value = results.rows.item(0).genero;
					}
			});
			
			
			
			ax.executeSql("SELECT respuesta FROM RESPUESTA WHERE idpregunta = ?", [idrand], function (ax, results)
			{
			
					document.getElementById("txtrespuesta1").value = results.rows.item(0).respuesta;
					document.getElementById("txtrespuesta2").value = results.rows.item(1).respuesta;
					document.getElementById("txtrespuesta3").value = results.rows.item(2).respuesta;
					document.getElementById("txtrespuesta4").value = results.rows.item(3).respuesta;

			});
			

		});	
					
	}
	
function pasar4() {
		
	db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);		
	db.transaction(function (ax) {
			ax.executeSql("SELECT tipomodo FROM MODO ", [], function (ax, results) 
			{
						
						 var valormodo = results.rows.item(0).tipomodo;

						
	 
	 
			 if(valormodo == 5){
						ax.executeSql("SELECT idrandom FROM RANDOM ", [], function (ax, results) 
						{
							idrand0 = results.rows.item(4).idrandom;
							
							
								if(document.getElementById("rdo1").checked){
									ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp1"]);
											location.href = 'Resultado.html';
									}else if(document.getElementById("rdo2").checked){
									ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp2"]);
												location.href = 'Resultado.html';
										}else if(document.getElementById("rdo3").checked){
										ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp3"]);
														location.href = 'Resultado.html';
											}else if(document.getElementById("rdo4").checked){
											ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp4"]);
															location.href = 'Resultado.html';
											}else{
										alert("seleccione una respuesta");
										}
							
						});
				}else if(valormodo == 10){
						
						
						ax.executeSql("SELECT idrandom FROM RANDOM ", [], function (ax, results) 
						{
							idrand0 = results.rows.item(4).idrandom;
							
							
								if(document.getElementById("rdo1").checked){
									ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp1"]);
											location.href = 'pregunta6.html';
									}else if(document.getElementById("rdo2").checked){
									ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp2"]);
												location.href = 'pregunta6.html';
										}else if(document.getElementById("rdo3").checked){
										ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp3"]);
														location.href = 'pregunta6.html';
											}else if(document.getElementById("rdo4").checked){
											ax.executeSql("insert into RESPUESTAU(idpregunta,respuestau)values(?,?)", [idrand0,"resp4"]);
															location.href = 'pregunta6.html';
											}else{
										alert("seleccione una respuesta");
										}
							
						});
						
						
				}
				
				
			});
		});	
	}
	
	
	
	
	function Resultado() {
			db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	
			
	 db.transaction(function (ax) {
					
				ax.executeSql("SELECT (COUNT(*)*20) AS R FROM RESPUESTAC AS R1, RESPUESTAU AS R2 WHERE R1.idpregunta = R2.idpregunta AND R1.respuestac = R2.respuestau", [], function (ax, results) 
					{
					var id = results.rows.item(0).R;
					if(id >= 70){
					alert("GANO UNA PENQUIADA");
					}else if(id <= 70){
					alert("PERDISTE");
	}
					});
				
		});
					
	}

		function Resultado1() {
			db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	
			
	 db.transaction(function (ax) {
					
				ax.executeSql("SELECT (COUNT(*)*10) AS R FROM RESPUESTAC AS R1, RESPUESTAU AS R2 WHERE R1.idpregunta = R2.idpregunta AND R1.respuestac = R2.respuestau", [], function (ax, results) 
					{
					var id = results.rows.item(0).R;
					if(id >= 70){
					alert("GANO UNA PENQUIADA");
					}else if(id <= 70){
					alert("PERDISTE");
	}
					});
				
		});
					
	}
	//==========================================================================================================
	//========							  ELIMINAR DATOS DEL JUEGO Y RANDOM	===================================
	//==========================================================================================================
	function nuevoJuego() {
	db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	
			
	 db.transaction(function (ax) {
	 ax.executeSql('DROP TABLE RESPUESTAU', []);
	 ax.executeSql('DROP TABLE RANDOM', []);
	 ax.executeSql('CREATE TABLE RANDOM (id integer primary key autoincrement, idrandom int)');
	 location.href = 'index.html';
	 });
	}
	function crearRandom(){

		db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);
			db.transaction(function (tx) {
						tx.executeSql("CREATE TABLE IF NOT EXISTS RANDOM (id integer primary key autoincrement, idrandom int)");
					 });
	}	
	
	function eliminarRandom() {
		db = openDatabase(namedatabase, dbversion, displayName, 50 * 1024);	
			
		 db.transaction(function (ax) {
		 ax.executeSql('DROP TABLE RANDOM', []);
		 iniciarapp()
	 });
	}
	
