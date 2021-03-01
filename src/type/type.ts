export type photosType = {
    small: string | null
    large: string | null
}
export type usersType = {
    id: number
    name: string
    status: string | null
    photos: photosType
    followed: boolean
}