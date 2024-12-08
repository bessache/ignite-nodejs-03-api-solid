import { SearchGymsUseCase } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function MakeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const UseCase = new SearchGymsUseCase(gymsRepository)
  return UseCase
}
