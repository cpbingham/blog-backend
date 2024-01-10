import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"]
};

export default config;