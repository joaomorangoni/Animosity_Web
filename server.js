import express from 'express'
import { GetAlunos, InsertAluno} from './components_api/UsuarioController.js'

const app = express()

app.use(express.json())

const users = []

//Criando uma rota

/*

    1- Tipo de rota / Método http

    2- Endereço
*/

app.post('/usuarios', (req,res)=>{
    InsertAluno(req, res);
})


app.get('/usuarios', (req, res)=>{
    GetAlunos(res);
})

//Informando a porta de resposta
app.listen(3000)