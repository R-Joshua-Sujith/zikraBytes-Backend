const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cron = require('node-cron');
const FileModel = require("./models/File");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send("Zikra Bytes Backend")
})

app.get('/scheduled-api', (req, res) => {
    axios.get('https://joshua-zikraBytes-assignment.onrender.com/')
        .then(response => {
            console.log(response.data);
            res.send('API request sent successfully');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Failed to send API request');
        });
});

cron.schedule('*/10 * * * *', () => {
    axios.get('http://localhost:5000/scheduled-api')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
});


app.post('/store-data', async (req, res) => {
    try {
        const { fileName, dataArray } = req.body;
        const newFile = new FileModel({ fileName, dataArray })
        await newFile.save();
        res.status(201).json({ message: "File Saved Successfully" })
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.listen(5000, () => {
    console.log("Backend Server is Running")
})