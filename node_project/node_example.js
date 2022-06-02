const res = require('express/lib/response')
var http = require('http')
var port = process.env.PORT || 3000
const server = http.createServer((req, res)=> {
    console.log('Creating server')
    res
})

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})