const fetcher = async (url: string, init: any = {}) => {
    if (!init.headers) init.headers = {'Accept': 'application/json', 'Content-Type': 'application/json', 'session': 'true'}
    const input = /http/gim.test(url) ? url : '/api/v1.0/' + url
    const r = await fetch(input, init)
    return r.json()
}

export const doPost = async (url: string, data: any) =>
    fetcher(url, { method: 'POST', body: JSON.stringify(data) })

export const doPut = async (url: string, data: any) =>
    fetcher(url, { method: 'PUT', body: JSON.stringify(data) })

export const doDelete = async (url: string) =>
    fetcher(url, { method: 'DELETE' })

export default fetcher