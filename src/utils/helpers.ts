import { nanoid } from 'nanoid'
import isUrl from 'is-url'

export const generateMiniUrlId = function(length = 5): string {
    return  nanoid(length)
}

export const urlValueValidator = function(value: {url: string}, helpers: any) {
    if(!isUrl(value.url)) {
        return helpers.error('any.invalid', { message: 'Invalid URL.'})
    }
    return value
}