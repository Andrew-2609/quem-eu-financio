import Redis from 'ioredis'
import { promisify } from 'util'

const redisClient = new Redis(
  `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
)

function getRedis(value: string): any {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)
  return syncRedisGet(value)
}

function setRedis(key: string, value: string): any {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient)
  return syncRedisSet(
    key,
    value,
    'ex',
    Number(process.env.REDIS_EXPIRE_SECONDS)
  )
}

export { redisClient, getRedis, setRedis }
