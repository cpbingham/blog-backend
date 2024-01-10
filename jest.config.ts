import type {Config} from 'jest';
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

process.env.NODE_ENV = 'UNIT_TEST'

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/", 'utils']
};

export default config;