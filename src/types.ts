export type IdType = number

export type SeminarItemType = {
    id: IdType,
    title: string,
    description: string,
    date: string,
    time: string,
    photo: string
}

export type SeminarsSliceType = {
    seminars: Array<SeminarItemType>,
    seminarsCount: number,
    pageSize: number,
    currentPage: number,
    seminarsToBeRemoved: Array<IdType>
}

export type GetSeminarsResponseType = Array<SeminarItemType>

export type RemoveSeminarType = IdType
export type RemoveSeminarResponseType = SeminarItemType

