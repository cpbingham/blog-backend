import {expect, test, } from '@jest/globals'
import { getSaltAndHash, isPasswordValid } from '../../src/utils/auth'

test('isPasswordValid correctly checks password', () => {
    const saltAndHash = getSaltAndHash('password')
    const isValid = isPasswordValid('password', saltAndHash)
    expect(isValid).toBe(true)
})