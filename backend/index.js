const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const database = require('./database')

const memos = [];

app.use(bodyParser.json())

app.get('/api/memos', async (req, res) => {
    const result = await database.run("select * from memos");
    res.send(result);
})

app.get("/api/memos/:idx", async (req, res) => {
    const result = await database.run(`select * from memos where id = (?)`, [req.params.idx]);
    console.log(result);
    res.send(result);
})

app.post('/api/memos', async (req, res) => {
    await database.run(`insert into memos (content) values (?)`, [req.body.content]);
    const result = await database.run("select * from memos");
    res.send(result);
})

app.put("/api/memos/:idx", async (req, res) => {
    //console.log(req.params.idx);
    //memos[req.params.idx] = req.body.content;
    await database.run(`update memos set content = ? where id = ?`, [req.body.content, req.params.idx]);
    const result = await database.run("select * from memos");
    res.send(result);
})

app.delete("/api/memos/:idx", async (req, res) => {
    await database.run(`delete from memos where id = ?`, [req.params.idx]);
    const result = await database.run("select * from memos");
    res.send(result);
})

app.listen(port, () => {
    console.log(`Memo app listening at http://localhost:${port}`);    
})