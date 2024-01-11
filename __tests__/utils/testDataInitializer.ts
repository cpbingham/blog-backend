import { User } from "../../src/models";
import { getRepository } from "./testRunner";
import { EMAIL, USERNAME, PASSWORD } from "./testVariables";

export const initializeUser = async (): Promise<User> => {
    const body = {
        username: USERNAME,
        email: EMAIL,
        password: PASSWORD,
        salt: '1234',
        hash: '1234'
    }
    const user: User = new User()
    Object.assign(user, body)
    return await getRepository(User).save(user)
}

export const initializeUserWithBody = async (body): Promise<User> => {
    const user: User = new User()
    Object.assign(user, body)
    return await getRepository(User).save(user)
}