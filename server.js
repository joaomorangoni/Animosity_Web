import express from 'express'
import { GetUser, InsertUser, UpdateUser} from './components_api/UsuarioController.js'

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



//Informando a porta de resposta
app.listen(3000)