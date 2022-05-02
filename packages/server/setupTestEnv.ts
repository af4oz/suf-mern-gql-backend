import dotenv from 'dotenv'
import path from 'path'

async function setup() {
  dotenv.config({ path: path.resolve(__dirname, '.env.test') })
}
export default setup
