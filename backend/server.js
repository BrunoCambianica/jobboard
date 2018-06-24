const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs')

let initialJobs = data.jobs;
let addedJobs = [];

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

api.get('/jobs', (req, res) => {
    // res.json(data.jobs);
    res.json(getAllJobs());
});

api.post('/jobs', (req, res) => {
    const job = req.body;
    res.json(job)
    addedJobs = [job, ...addedJobs]
    getAllJobs()
    console.log('total number : ' + getAllJobs().length)

})

app.use('/api', api);

const port = 3000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})