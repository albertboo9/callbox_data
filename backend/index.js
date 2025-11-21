const http = require("http")


const PORT = 5000
const server =  http.createServer((req, res)=>{
    res.end(`voici votre reponse djimeli`)
})

server.listen(PORT, ()=>{
    console.log(`serveur lancé sur le port ${PORT}`)
})