//usar todas as funções do express
const express = require('express');

const server = express();
server.use(express.json());

//query params são o que vem antes das rotas--- ?nome=NodeJs
//route params são como se fosse o endereço --- /curso/id
//request body é o corpo do objeto-- {nome:' NodeJs', tipo:' backend'}
//CRUD -> CREATE, READ, UPDATE E DELETE

const cursos = ['Node js', 'javaScript', 'React Native','java']

server.use((req,res,next)=>{
   console.log(`URL CHAMADA: ${req.url}`);

   return next();
});

function checkCurso(req,res,next){
   if(!req.body.name){
      return res.status(400).json({error: "Nome do curso é obrigatório"});

   }
   return next();
};
function checkIndexCurso(req,res,next){
   const curso = cursos[req.params.index];
   
   if(!curso){
      return res.status(400).json({error: "O usuário não existe"})
   }
   return next();
}


server.get('/cursos',(req,res)=>{
   return res.json(cursos);
});



//configurando uma rota de acesso
//localhost:3000/curso
server.get('/cursos/:index', checkIndexCurso,(req, res) =>{
   // return res.send("Hello Word!")
   //const nome= req.query.nome;
   const {index} = req.params;

   //return res.json({curso: `Aprendendo curso: ${id}`});
   return res.json(cursos[index]);
});
 //criar um novo curs0

server.post('/cursos',checkCurso,(req,res)=>{
   const {name} = req.body;
   cursos.push(name)

   return res.json(name);
 });

 //atualizar um curso

 server.put('/cursos/:index',checkCurso, checkIndexCurso,(req,res)=>{
   const {index} = req.params;
   const {name} = req.body;

   cursos[index] = name;

   return res.json(cursos);
 });

 //deletar curso existente

 server.delete('/cursos/:index',checkIndexCurso, (req,res)=>{
   const {index} = req.params;

   cursos.splice(index,1);
   return res.json({message: "curso deletado com sucesso"});
 })

//escolher uma porta para rodar a aplicação
server.listen(3000);

