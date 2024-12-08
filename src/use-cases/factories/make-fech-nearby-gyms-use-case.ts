import { FetchNearbyGymsUseCase } from '../fech-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const UseCase = new FetchNearbyGymsUseCase(gymsRepository)
  return UseCase
}
