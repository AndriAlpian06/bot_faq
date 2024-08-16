import express from 'express'
import { addFAQ } from './models/faq'

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('FAQ Bot API is running');
});

app.post('/faq', async (req, res) => {
    const { question, answer } = req.body;
    try{
        await addFAQ({ id: 0, question, answer});
        res.status(201).send('FAQ added');
    } catch (error){
        res.status(500).send('Error adding FAQ');
    }
})

app.listen(3000, () => {
    console.log('Server is Running on Port 3000')
})