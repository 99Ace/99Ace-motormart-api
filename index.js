const express = require('express');
const app = express();

app.use((req,res) => {
    res.send("<h1>Welcome to 99Ace World</h1>")
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log("Server is running...", PORT)
})