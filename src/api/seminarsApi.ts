import {
    GetSeminarsResponseType,
    RemoveSeminarResponseType,
    RemoveSeminarType,
    SeminarItemType,
} from "../types";
import {baseRequestParams, seminarsURL} from "./apiConfig";

export const seminarsApi = {
    fetchSeminars(): Promise<GetSeminarsResponseType> {
        return baseRequestParams.get(`${seminarsURL}`)
            .then(response => response.data)
    },
    removeSeminar(id: RemoveSeminarType): Promise<RemoveSeminarResponseType> {
        return baseRequestParams.delete(`${seminarsURL}/${+id}`)
            .then(response => response.data)
    },
    editSeminar(seminarData: SeminarItemType): Promise<SeminarItemType> {
        return baseRequestParams.put(`${seminarsURL}/${+seminarData.id}`, seminarData)
            .then(response => response.data)
    }
}