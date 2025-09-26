import express from 'express'

const app = express()

app.use(express.json())

const users = []

//Criando uma rota

/*

    1- Tipo de rota / Método http

    2- Endereço
*/

app.post ('/usuarios', (req,res)=>{
    users.push(req.body)
    res.status(201) .json(req.body)
})


app.get('/usuarios', (req, res)=>{
    res.json(users)
    res.status(200) .json(req.body)

})

//Informando a porta de respost
app.listen(3000)