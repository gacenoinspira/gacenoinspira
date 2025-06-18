
export type ResponseType<T> = {
    status: boolean
    data: T
    error: string
}