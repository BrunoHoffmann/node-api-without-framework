import { randomUUID } from 'node:crypto'

export default class User {
    constructor({email, passwd}) {
        this.id = randomUUID()
        this.email = email
        this.passwd = passwd
    }
}