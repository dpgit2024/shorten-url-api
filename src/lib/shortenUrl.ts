import { nanoid } from 'nanoid'
export const shortenUrl = function(originalUrl: string, protocol: string, host: string): string {
    const id =  nanoid(5)
    
    return `${protocol}://${host}/${id}`
}