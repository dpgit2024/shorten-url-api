import { hashPassword, comparePassword } from '../../src/lib/password'
import bcrypt from 'bcrypt'

jest.createMockFromModule('bcrypt')

const mockHash = bcrypt.hash as jest.Mock
const mockCompare = bcrypt.compare as jest.Mock

describe('password lib tests - ', function() {
    it('hashPassword should call hash ', async function () {
        mockHash.mockResolvedValueOnce('hash')
        const hashedPassword = await hashPassword('plain')
        expect(mockHash).toHaveBeenCalled()
        expect(hashedPassword).toBe('hash')
    })

    it('hashPassword should call hash ', async function () {
        mockCompare.mockResolvedValueOnce(false)
        const isMatch = await comparePassword('plain', 'jaklxk')
        expect(mockCompare).toHaveBeenCalled()
        expect(isMatch).toBeFalsy()
    })
})