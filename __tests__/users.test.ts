import { User } from "../src/models";
import { Repository } from "typeorm";
import { getApp, startApp, cleanUpDatabase, stopApp, getRepository } from "./utils/testRunner";
import request, { Response } from 'supertest'
import { EMAIL, USERNAME } from "./utils/testVariables";
import { commonUserBody } from "./utils/testDataConstructor";


const TEST_NAME = 'USER'

beforeAll(async () => {
    await startApp(TEST_NAME)
})

beforeEach(async () => {
    await cleanUpDatabase(User)
})

afterAll(async () => {
    await stopApp()
})

const getUserRepository = (): Repository<User> => {
    return getRepository(User)
}
  
describe('User Register Test', () => {
it('should be a sucess to register', async () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: Response<any> = await request(getApp())
        .post(`/auth/register`)
        .send(commonUserBody)

    expect(response.statusCode).toBe(201)

    const responseData = response.body.data
    expect(responseData.username).toBe(USERNAME)
    expect(responseData.email).toBe(EMAIL)
    expect(await getUserRepository().count()).toBe(1)
})
})