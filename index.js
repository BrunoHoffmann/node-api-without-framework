import { createServer } from 'node:http'
const PORT = 3000

createServer(async(request, response) => {
    response.end('ok')
})
.listen(PORT)
.on('listening', _ => console.log('server is running at', PORT))