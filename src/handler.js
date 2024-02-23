import { parse } from 'node:url'

const allRoutes = {
    '/session/login:post': (request, response) => {
        console.log(request.body)
        response.write('login')
        response.end()
    },
    // 404 routes
    default: (request, response) => {
        response.write('not found')
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

    return chosen(request, response)
}

export {
    handler
}