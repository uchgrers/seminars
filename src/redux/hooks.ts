import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store";
import {useEffect, useMemo} from "react";
import {SeminarItemType} from "../types";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type UseItemsSelectorArgs = {
    currentPage: number,
    pageSize: number
}

// Хук для реализации постраничного вывода элементов
// Возвращает часть списка для указанной страницы

export const usePaginatedSeminars = ({currentPage, pageSize}: UseItemsSelectorArgs): {seminars: Array<SeminarItemType>} => {

    const seminars = useAppSelector(state => state.seminarsReducer.seminars)

    return useMemo(() => {
        return {seminars: seminars.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
    }, [seminars, currentPage, pageSize])
}

// Хук для реализации функции отмены (закрытия модального окна) при нажатии на клавишу Escape

export const useEscapeModalCloser = (cancel: (() => void) | undefined) => {
    useEffect(() => {
        const escapeHandler = (event: KeyboardEvent) => {
            if (event.key === "Escape" && cancel) {
                cancel()
            }
        }
        window.addEventListener("keydown", escapeHandler)

        return () => {
            window.removeEventListener("keydown", escapeHandler)
        }
    }, [cancel])
}