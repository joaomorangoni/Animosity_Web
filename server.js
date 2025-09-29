import express from 'express'
import { GetUser, InsertUser, UpdateUser, DeleteUser} from './components_api/UsuarioController.js'
import { GetFeed, InsertFeed, UpdateFeed, DeleteFeed} from './components_api/FeedbacksController.js'

const app = express()

app.use(express.json())



//Criando uma rota

/*

    1- Tipo de rota / Método http

    2- Endereço
*/

app.post('/usuarios', (req,res)=>{
    InsertUser(req, res);
})


app.get('/usuarios', (req, res)=>{
    GetUser(res);
})


app.put('/usuarios/:id', (req, res)=>{
    UpdateUser(req, res);
})

app.delete('/usuarios/:id', (req, res)=>{
    DeleteUser(req, res);
})

//Fedas



app.post('/feedbacks/:id_usuario', (req,res)=>{
    InsertFeed(req, res);
})


app.get('/feedbacks/:id_usuario', (req, res)=>{
    GetFeed(res);
})


app.put('/feedbacks/:id_usuario', (req, res)=>{
    UpdateFeed(req, res);
})

app.delete('/feedbacks/:id_usuario', (req, res)=>{
    DeleteFeed(req, res);
})







//Informando a porta de resposta
app.listen(3000)