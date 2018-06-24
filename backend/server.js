const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs')

let initialJobs = data.jobs;
let addedJobs = [];

const fakeUser = {email: 'bc@test.fr', password: 'aze'}
const jwt = require('jsonwebtoken');

const getAllJobs = () => {
    return [...addedJobs, ...initialJobs];
}

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const api = express.Router();
const auth = express.Router();

auth.post('/login', (req, res) => {
    if(req.body){
        const email = req.body.email.toLocaleLowerCase();
        const password = req.body.password.toLocaleLowerCase();
        
        if(email === fakeUser.email && password === fakeUser.password){
            delete req.body.password;
            res.json({success: true, data: req.body});
        }
        else {
            res.json({success: false, message: 'identifiants incorrects'})
        }
    } else {
        res.json({ success: false, message: 'données manquantes'})
    }
})

// auth.get('/login', (req, res) => {
//     console.log('test')
// })

api.get('/jobs', (req, res) => {
    // res.json(data.jobs);
    getAllJobs();
    res.json(getAllJobs());
});

api.get('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const job = getAllJobs().filter(j => j.id === id);
    if (job.length === 1){
        res.json({ success: true, job: job[0]})
    } else {
        res.json({success: false, message: `pas de job ayant été retrouvé`})
    }
});

api.post('/jobs', (req, res) => {
    console.log('*****************************************************');
    const job = req.body;
    res.json(job)
    addedJobs = [job, ...addedJobs]
    getAllJobs()
    console.log('total number : ' + getAllJobs().length)

})


app.use('/api', api);
app.use('/auth', auth);

const port = 3000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})