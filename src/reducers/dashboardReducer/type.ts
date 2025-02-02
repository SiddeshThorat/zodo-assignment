export type IDashboardState = {
  loaders: {
    fetching: boolean
  }
  data: MovieData[]
  totalPages: number,
  currentPage: number,
  searchText: string
}

export type MovieData = {
  imageUrl: string
  title: string
}