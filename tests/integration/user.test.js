import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'
test('User integration test suite', async (t) => {
    const testPort = 9009

    // that's bad practice bacause it mutates the environment
    process.env.PORT = testPort
    const { server } = await import('../../src/index.js')
    const testServerAddress = `http://localhost:${testPort}/users`
   
    await t.test('it should create a user', async(t) => {
        const data = {
            email: "teste@test.com",
            passwd: "123"
        }

        const request = await fetch(testServerAddress, {
            method: "POST",
            body: JSON.stringify(data)
        })

        assert.deepStrictEqual(
            request.headers.get('content-type'),
            'application/json'
        )

        assert.strictEqual(request.status, 201)

        const result = await request.json()
        assert.deepStrictEqual(
            result.success,
            'User created with success!!',
            'it should return a valid text message'
        )

        assert.ok(
            result.id.length > 30,
            'id should be a valid uuid'
        )
    })

    await promisify(server.close.bind(server))()
})