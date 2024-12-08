import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkiInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkiInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkiInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkiInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkiInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })
    expect(checkInsCount).toEqual(2)
  })
})
