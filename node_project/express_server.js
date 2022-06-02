const express = require('express');
const res = require('express/lib/response');
const errorHandling = require('./middleware/errorHandling')

const app = express()
ticket_id_generator = 0;
const purchased_tickits = new Map()
let city_and_theaters = new Map()
let theater_and_date_vs_movie = new Map()

function init(){

    for (let i = 0 ; i < 5 ; i++){
        city_and_theaters.set(`City ${i+1}`, [1,2,3,4])
    }

    for (let i = 1; i < 5 ; i++){
        
        for (let j = 1 ; j < 13 ; j++){
            for (let k = 1; k < 31 ; k++){
                theater_and_date_vs_movie.set([i,`${k}/${j}/2022`],Math.floor(Math.random() * 4) + 1)
            }
        }
        
    }
   
    
}

function generate_ticket(){
    return ticket_id_generator++
}

function validate_ticket(ticket_id){
    return purchased_tickits.has(ticket_id)
}

function purchase_tickits(movie_name, date, city, theater, payment_method){
    
    if(city_and_theaters.has(city)){
        if(city_and_theaters.get(city).has(theater)){
            if (can_pay(payment_method)){
                let ticket_id =  generate_ticket()
                purchased_tickits.set(ticket_id, movie_name)
                return ticket_id
            }
            throw 'payment method does not work!'
        }
        throw 'theater does not exist!'
    }
    throw 'city does not exist!'
}

app.get('/theaters-of-movie-on-date', (req, res) => {
    let movie = req.query.movie
    let date = req.query.date
    let theaters = theaters_list_string(get_theaters(movie, date))
    res.status(200).send(`Theaters: ${theaters}`)
})

app.post('/purchase-ticket', (req, res) => {
    const movie_name = req.query.movie
    const payment_method = req.query.payment
    const ticket_id = purchase_tickits(movie_name, payment_method)
    res.status(200).send(`Ticket id: ${ticket_id} was purchased!`)
})

app.get('/validate-ticket', (req, res) => {
    const ticket_id = req.query.movie
    const result = validate_ticket(ticket_id)
    res.status(200).send(`${result}`)
} )




app.use(errorHandling) 
app.all('*', (req, res) => {
    res.status(500).send('something')
})

app.listen(3000) 
init()