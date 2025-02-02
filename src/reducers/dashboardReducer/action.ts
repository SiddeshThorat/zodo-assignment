import { IDashboardState } from "./type"

export const SET_LOADERS = 'SET-LOADERS'
export const SET_DATA = 'SET_DATA'
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'

export const setLoaders = (payload: { loadername: string, status: boolean }) => ({
  type: SET_LOADERS,
  payload
})

export const setData = (payload: { data: IDashboardState['data'], currentPage: number, totalPages: number }) => ({
  type: SET_DATA,
  payload
})

export const setSearchText = (payload: { searchText: string }) => ({
  type: SET_SEARCH_TEXT,
  payload
})