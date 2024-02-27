import { parse } from 'node:url'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { DEFAULT_HEADER } from './util/util.js'
import { routes } from './routes/userRoute.js'
import { generateInstance } from './factories/userFactory.js'

const currentDir = dirname(
    fileURLToPath(
        import.meta.url
    )
)

const filePath = join(currentDir, '..', 'database', 'data.json')

const userService = generateInstance({
    filePath
})
const userRoutes = routes({
    userService
})

const allRoutes = {
    ...userRoutes,
    '/session/login:post': async(request, response) => {
        response.write(JSON.stringify({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        })),
        
        response.end()
    },
    // 404 routes
    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER)
        response.end()
    }
}

function handler(request, response) {
    const {
        url,
        method
    } = request;
    const { pathname } = parse(url, true)
    const key = `${pathname}:${method.toLowerCase()}`
    const chosen = allRoutes[key] || allRoutes.default

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (method === 'OPTIONS') {
        // if is a OPTIONS request, only send the cors headers and finish the request
        response.writeHead(200);
        response.end();
        return;
    }

    return Promise.resolve(chosen(request, response))
    .catch(handlerError(response))
}

function handlerError(response) {
    return error => {
        console.log('something bad has happened', error.stack)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({
            error: 'internet server error'
        }))
    }
}

export {
    handler
}