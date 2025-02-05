import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    IdType,
    SeminarItemType,
    SeminarsSliceType,
    GetSeminarsResponseType,
    RemoveSeminarResponseType,
} from "../types";
import {
    seminarsApi
} from "../api/seminarsApi";

export const initialState: SeminarsSliceType = {
    seminars: [],
    seminarsCount: 0,
    pageSize: 5,
    currentPage: 1,
    seminarsToBeRemoved: []
}

export const getSeminars = createAsyncThunk<GetSeminarsResponseType>(
    'todos/getTodos',
    async function () {
        return await seminarsApi.fetchSeminars()
    }
)

export const removeSeminar = createAsyncThunk<RemoveSeminarResponseType, IdType>(
    'todos/removeTodo',
    async function (id, {dispatch}) {
        dispatch(setItemToRemoval(id))
        const result = await seminarsApi.removeSeminar(id)
        dispatch(removeItemIdFromRemovingList(id))
        return result
    }
)

export const editSeminar = createAsyncThunk<SeminarItemType, SeminarItemType>(
    'todos/editTodo',
    async function (seminarData) {
        return await seminarsApi.editSeminar(seminarData)
    }
)

const seminarsSlice = createSlice({
    name: 'seminars',
    initialState,
    reducers: {
        changeCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        changePageSize(state, action) {
            state.pageSize = action.payload
            if (state.currentPage > Math.ceil(state.seminarsCount / state.pageSize) && Math.ceil(state.seminarsCount / state.pageSize) > 0) {
                state.currentPage = Math.ceil(state.seminarsCount / state.pageSize)
            }
        },
        setItemToRemoval(state, action) {
            state.seminarsToBeRemoved.push(action.payload)
        },
        removeItemIdFromRemovingList(state, action) {
            state.seminarsToBeRemoved = state.seminarsToBeRemoved.filter(seminarId => seminarId !== action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(getSeminars.fulfilled, (state, action) => {
            state.seminars = action.payload
            state.seminarsCount = action.payload.length
        })
        builder.addCase(removeSeminar.fulfilled, (state, action) => {
            state.seminars = state.seminars.filter(seminar => seminar.id !== action.payload.id)
            state.seminarsCount = state.seminars.length
        })
        builder.addCase(editSeminar.fulfilled, (state, action) => {
            const index = state.seminars.findIndex(seminar => seminar.id === action.payload.id);
            if (index !== -1) {
                state.seminars[index] = action.payload;
            }
        })
    }
})

export const {
    changeCurrentPage,
    changePageSize,
    setItemToRemoval,
    removeItemIdFromRemovingList
} = seminarsSlice.actions

export default seminarsSlice.reducer