import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const ExpiresInKey = 'Admin-Expires-In'

export const getToken = () => {
    return Cookies.get(TokenKey)
}

export const setToken = (token: string) => {
    return Cookies.set(TokenKey, token)
}

export const removeToken = () => {
    return Cookies.remove(TokenKey)
}

export const getExpiresIn = () => {
    return Cookies.get(ExpiresInKey) || -1
}

export const setExpiresIn = (time: any) => {
    return Cookies.set(ExpiresInKey, time)
}

export const removeExpiresIn = () => {
    return Cookies.remove(ExpiresInKey)
}