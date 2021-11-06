const UserModel = require('../models/UserModel')
const FoodModel = require('../models/FoodModel')
const fs = require('fs')
require('dotenv').config()

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

// If is the first time 
if (process.env.loaded == undefined){
    console.log("First time entered!, Appending some items to database.")
    //create some items to mongoose database
    FoodModel.create({
        name: 'sorvete-baunilha',
        description: 'sorvete sabor baunilha',
        type: 'sorvetes sobremesas',
        price: 3
    });

    FoodModel.create({
        name: 'sorvete-chocolate',
        description: 'sorvete sabor chocolate',
        type: 'sorvetes sobremesas',
        price: 3
    });

    FoodModel.create({
        name: 'sorvete-morango',
        description: 'sorvete sabor morango',
        type: 'sorvetes sobremesas',
        price: 3
    });

    FoodModel.create({
        name: 'batata-frita',
        description: 'batatas fritas salgadas sem óleo',
        type: 'salgados',
        price: 3
    });

    FoodModel.create({
        name: 'coxinha',
        description: 'coxinhas de frango com catupiri',
        type: 'salgados',
        price: 3
    });

    FoodModel.create({
        name: 'bolo-chocolate',
        description: 'bolo grande sabor chocolate com recheio',
        type: 'bolos sobremesas',
        price: 3
    });

    FoodModel.create({
        name: 'beef',
        description: 'filé de beef carne vermelha',
        type: 'carnes-peixes',
        price: 3
    });

    FoodModel.create({
        name: 'pizza',
        description: 'pizza de peperoni',
        type: 'pizzas',
        price: 3
    });

    FoodModel.create({
        name: 'pastel',
        description: 'pastel com frango e catupiri',
        type: 'salgados',
        price: 3
    });

    FoodModel.create({
        name: 'salmão',
        description: 'filé de peixe',
        type: 'carnes-peixes',
        price: 3
    });

    FoodModel.create({
        name: 'macarrão',
        description: 'macarrão',
        type: 'refeicoes',
        price: 3
    });

    FoodModel.create({
        name: 'cachorro-quente',
        description: 'cachorro quente',
        type: 'salgados',
        price: 3
    });

    FoodModel.create({
        name: 'morango',
        description: 'morango vermelho',
        type: 'frutas sobremesas',
        price: 3
    });
    
    fs.appendFile('.env', "\nloaded=true", (err) =>{
        if (err){
            console.log(err)
        }
    });
}

exports.root = function (req, res) {
    res.render('index')
} 

exports.search = function (req, res){
    var search = req.params.query;
    var optionals = req.query;

    let query_object = {};

    if (optionals.category){
        query_object.type = new RegExp(`(${optionals.category})`)
    }

    if (search && search != "todos" && search != "Todos"){
        query_object.name =  new RegExp(`^${search}`, 'i');
    }
    else {
        if (optionals.category){
            search = optionals.category
        }
        else { search = "Todos"}
    }

    FoodModel.find( query_object, ( err, data) =>{
        if (err) console.log(err);
        res.render('search', {search: search, optionals: optionals, results: data})
    });
}

exports.item = function (req, res) {
    let item = req.params.item

    // Find food
    FoodModel.findOne( {name: new RegExp(`^${item}`, "i") }, ( err, data) =>{
        if (err) console.log (err);

        FoodModel.find(function (err, data2){
            // Render page with item object and more
            shuffle(data2)
            res.render('item', {item: data, see_more: data2.slice(0, 3)});
        });
    });
}

exports.create_user = function ( req, res){
    UserModel.create({
        nome: req.body.name,
        description: req.body.description,
        money: 0
    });
}