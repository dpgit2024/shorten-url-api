import { nanoid } from 'nanoid'

export const generateUniqueRandomString = function(length = 5): string {
    return  nanoid(length)
}

export const generateMiniUrlId = function(): string {
    return generateUniqueRandomString()
}