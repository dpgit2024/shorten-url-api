import { nanoid } from 'nanoid'
export const shortenUrl = function(originalUrl: string): string {
    const id =  nanoid(5)
    return id
}