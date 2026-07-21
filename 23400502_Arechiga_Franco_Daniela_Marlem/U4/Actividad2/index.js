const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;

app.use(morgan("dev"));

app.get("/calificacion/:nota",(req,res) =>{
    const nota= parseInt(req.params.nota);
    if(nota >=90){
        res.send(`Nota: ${nota} Excelente`);
    }else if(nota >= 80){
        res.send(`Nota: ${nota} Muy Bien`);
    }else if(nota >= 70){
        res.send(`Nota: ${nota} Aprobado`);
    }else{
        res.send(`Nota: ${nota} Reprobado`);
    }
});

app.get("/tabla/:numero",(req,res) =>{
    const numero=parseInt(req.params.numero);
    let tabla = "";
    for(let i=0;i<10;i++){
      tabla += `${numero} X ${i}= ${numero*i}<br>`;
    }
    res.send(tabla);
});

app.get("/calculadora/:operacion/:a/:b", (req,res) =>{
     const operacion=req.params.operacion;
     const a=parseFloat(req.params.a);
     const b=parseFloat(req.params.b);
   
     if(operacion==="suma"){
        res.send(`Resultado: ${a+b}`);
    }else if(operacion==="resta"){
        res.send(`Resultado: ${a-b}`);
    }else if(operacion==="multiplicacion"){
        res.send(`Resultado: ${a*b}`);
    }else if(operacion==="division"){
        res.send(`Resultado: ${a/b}`);
    } 
});


app.get("/edad/:edad",(req,res) =>{
    const edad= parseInt(req.params.edad);
    if(edad >=18){
        res.send(`Edad: ${edad} es mayor de edad`);
    }else{
        res.send(`Edad: ${edad} es menor de edad`);
    }
});

app.get("/par/:numero", (req, res) =>{
    const numero= parseInt(req.params.numero);
    if(numero %2 === 0){
    res.send(`El numero: ${numero} es par`);
    }else{
      res.send(`El numero: ${numero} es impar`);   
    }
    
});


app.listen(PORT, () => {
    console.log("Servidor iniciado en http://localhost:"+PORT);
});

