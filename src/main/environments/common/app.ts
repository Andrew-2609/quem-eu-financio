import fs from 'fs/promises'
import path from 'path'
import { HttpRestEnvironment } from '../http-rest/environment'

export class App {
  async start(): Promise<void> {
    const filePath = path.join(__dirname, '..', '..', '..', '..', '.env')

    await fs.access(filePath).catch((_err) => {
      throw new Error(`File not found: ${filePath}`)
    })

    this.httpRest().start()
  }

  private httpRest(): HttpRestEnvironment {
    return new HttpRestEnvironment(
      Number(process.env.APP_PORT),
      String(process.env.APP_VERSION)
    )
  }
}
