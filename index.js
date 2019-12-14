const express = require('express')
const app = express()
const BodyParser = require('body-parser')

const port = process.env.PORT || 3000

const path = require('path')

const convert = require('./lib/convert')

const apiBCB = require('./lib/api.bcb')

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(BodyParser.urlencoded({extended: false}))



app.get('/', async (req, res) => {
    const cotacao = await apiBCB.getCotacao()
    res.render('home', {
        cotacao
    })
})

    app.listen(port,(err) =>{
        if(err){
            console.log('Problem!  Server not load...')
        }else{
            console.log('Server is up!')
        }
    })

    app.get('/cotacao', (req, res) => {
        const {cotacao, quantidade} = req.query
        if (cotacao && quantidade){
        const conversao = convert.convert(cotacao,quantidade)
        res.render('cotacao', {
            error: false,
            conversao: convert.toMoney(conversao),
            cotacao: convert.toMoney(cotacao),
            quantidade
        })} else {
            res.render('cotacao', {
                error: 'Valores inválidos'
            })
        }
    })

    