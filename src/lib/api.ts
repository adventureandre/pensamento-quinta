export function api(path:string, init?:RequestInit){
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const apiPrefix =  ""

    const url =  new URL(apiPrefix.concat(path),baseUrl)


    return fetch(url,init)
}