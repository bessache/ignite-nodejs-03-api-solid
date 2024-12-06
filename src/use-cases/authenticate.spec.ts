import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import bcrypt from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to Authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@example1.com',
      password_hash: await bcrypt.hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johnDoe@example1.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to Authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johnDoe@example1.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to Authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@example1.com',
      password_hash: await bcrypt.hash('123456', 6),
    })
    await expect(() =>
      sut.execute({
        email: 'johnDoe@example1.com',
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
