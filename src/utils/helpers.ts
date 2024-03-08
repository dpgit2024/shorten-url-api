import { nanoid } from 'nanoid'

export const generateMiniUrlId = function(length = 5): string {
    return  nanoid(length)
}