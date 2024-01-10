import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  testPathIgnorePatterns: ["<rootDir>/dist/"]
};

export default config;