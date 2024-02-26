import { once } from 'node:events'
import User from '../entities/user.js'
import { DEFAULT_HEADER } from '../util/util.js'

const routes = ({
    userService
}) => ({
    '/users:get': async(request, response) => {
        const users = await userService.find()
        response.write(JSON.stringify({
            results: users
        })),
        response.end()
    },
    '/users:post': async(request, response) => {
        const data = await once(request, 'data')
        const item = JSON.parse(data)
        const user = new User(item)

        const id = await userService.create(user)
    
        response.writeHead(201, DEFAULT_HEADER)
        response.write(JSON.stringify({
            id,
            success: 'User created with success!!'
        }))
        return response.end()
    }
})  

export {
    routes
}