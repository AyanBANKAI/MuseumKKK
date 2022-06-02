let mongodb=require ('mongodb');
let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/', {
    useUnifiedTopology: true
});
const express = require('express')
const path = require('path')
const app = express()
const bodyParser=require('body-parser');
app.set('view engine', 'ejs')
app.listen(3000, function() {
    console.log('running');
});
app.use(bodyParser.urlencoded({extended:true}));
mongoClient.connect(async function(error, mongo) {
    if (!error) {
        app.get('/users',async function(req, res) {
            let db = mongo.db('test');
            let coll = db.collection('users');
            let coll1 = db.collection('museum');
            let museum = await coll1.find().sort({mname:1}).toArray();
            let users = await coll.find().sort({name:1}).toArray();
            res.render('users', {users: users, museum: museum});
        });
        app.get('/user/delete/:name', async function(req, res) {
            let db = mongo.db('test');
            let coll = db.collection('users');
            let coll1 = db.collection('museum')
            let name = req.params.name;
            let user = await coll.deleteOne({name: name});
            res.send('deleted successfully');
        });
        app.get('/user/add', function(req, res) {
            res.render('add');
        });
        app.post('/user/add', async function(req, res) {
            delete req.body._id;
            let db = mongo.db('test');
            let coll = db.collection('users');
            let coll1 = db.collection('museum')
            let user=req.body;
            let result= await coll.insertOne(user);
            res.send('added successfully');
        });
        app.get('/user/edit/:name',async function(req, res) {
            let db = mongo.db('test');
            let coll = db.collection('users');
            let name= req.params.name;
            let user = await coll.findOne({name: name});
            res.render('edit', {user});
        });
        app.post('/user/edit/:name', async function(req, res) {
            delete req.body._id;
            let db = mongo.db('test');
            let coll = db.collection('users');
            let coll1 = db.collection('museum')
            let user = req.body;
            let resuk= await coll.updateOne({name: user.name}, {$set: user});
            res.send('edited successfully');
        });
        let db = mongo.db('test');
        let coll = db.collection('users');
        let coll1 = db.collection('museum')

    } else {
        console.error(error);
    }
    app.get('/user/edit/:name',async function(req, res) {
        let db = mongo.db('test');
        let coll = db.collection('users');
        let coll1 = db.collection('museum')
        let name= req.params.username;
        let user = await coll.findOne({name: name});
        res.render('edit', {user});
    });
    app.post('/user/edit/:name', async function(req, res) {
        delete req.body._id;
        let db = mongo.db('test');
        let coll = db.collection('users');
        let coll1 = db.collection('museum')
        let user = req.body;
        let resuk= await coll.updateOne({name: user.name}, {$set: user});
        res.redirect('/users');
    });
    app.get('/user/add', function(req, res) {
        res.render('add');
    });
    app.post('/user/add', async function(req, res) {
        delete req.body._id;
        let db = mongo.db('test');
        let coll = db.collection('users');
        let coll1 = db.collection('museum')
        let user=req.body;
        let result= await coll.insertOne(user);
        res.redirect('/users');
    });
    app.get('/user/madd', function(req, res) {
        res.render('madd');
    });
    app.post('/user/madd', async function(req, res) {
        delete req.body._id;
        let db = mongo.db('test');
        let coll = db.collection('museum');
        let user=req.body;
        let result= await coll.insertOne(user);
        res.redirect('/user');
    });


});

