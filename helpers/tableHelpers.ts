export function dataSorter<T>(
  data: T[],
  sortDirection: "asc" | "desc" | null,
  sortColumn: string | null
): T[] {
  if (sortColumn === null || sortDirection === null) return data
  data.sort((a: T, b: T) => {
    if (a[sortColumn as keyof T] > b[sortColumn as keyof T]) {
      return sortDirection == "asc" ? 1 : -1
    } else if (a[sortColumn as keyof T] < b[sortColumn as keyof T]) {
      return sortDirection == "asc" ? -1 : 1
    } else if (a[sortColumn as keyof T] === b[sortColumn as keyof T]) {
      return 0
    } else {
      return 0
    }
  })
  return data
}

export function textFilter<T>(data: T[], filterString: string): T[] {
  if (filterString === "") return data
  return data.filter((item: T) =>
    Object.values(item as object)
      .map((val) =>
        val === null || val == undefined
          ? false
          : String(val).includes(filterString)
      )
      .some(Boolean)
  )
}

export function sortAndFilter<T>(
  data: T[],
  sortDirection: "asc" | "desc",
  sortColumn: string,
  filterString: string
): T[] {
  let filtered = textFilter<T>(data, filterString)
  return dataSorter<T>(filtered, sortDirection, sortColumn)
}
