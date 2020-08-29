const { hash } = require('bcryptjs')
const faker = require('faker')

const User = require('./src/app/models/User')

let usersIds = []

async function createUsers() {
  const users = []
  const password = await hash('11111', 8)

  while (users.length < 3) {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password,
      cpf_cnpj: faker.random.number(),
      cep: faker.random.number(),
      address: faker.address.streetAddress(),
    })
  }

  const userPromise = users.map(user => User.create(user))
  
  userIds = await Promise.all(usersIds)
}

createUsers()