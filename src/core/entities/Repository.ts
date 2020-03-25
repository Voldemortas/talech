interface IData<T> {
  id: number
  Data: T[]
  Deleted: boolean
}

type searchType<T> = {
  deleted?: boolean
  id?: number
  predicate?: (obj: T) => boolean
}

export default class Repository<T> {
  private AutoIncrement = 0
  private Data: IData<T>[] = []

  public Insert(data: T[]): void {
    this.Data.push({ id: ++this.AutoIncrement, Data: data, Deleted: false })
  }

  public Select({ deleted, id, predicate }: searchType<T> = {}): IData<T>[] {
    predicate = predicate === undefined ? (t: T) => true : predicate
    let temp =
      deleted === undefined
        ? this.Data
        : this.Data.filter((d) => d.Deleted === deleted)
    temp = id === undefined ? temp : temp.filter((d) => d.id === id)
    return temp.filter((d) => d.Data.filter(predicate!))
  }

  public Update({ id, data }: { id: number; data: T[] }): void {
    this.Data = [
      ...this.Data.filter((d) => d.id !== id),
      ...this.Data.filter((d) => d.id === id).map((d) => {
        return { ...d, Data: [...d.Data, ...data] }
      }),
    ]
  }

  public Delete(id: number): void {
    this.Data = [
      ...this.Data.filter((d) => d.id !== id),
      ...this.Select({ id }).map((d) => {
        return { ...d, Deleted: true }
      }),
    ]
  }

  /**
   * @description saves database to localstorage
   */
  public Save(name: string): void {
    localStorage.setItem(name, JSON.stringify({ ...this }))
  }

  /**
   * @description loads database from localstorage
   */
  public Load(name: string): Repository<T> {
    let json = localStorage.getItem(name)
    json = json === null ? '{"AutoIncrement": 0, "Data": []}' : json
    let data = JSON.parse(json) as Repository<T>
    this.AutoIncrement = data.AutoIncrement
    this.Data = data.Data
    return this
  }
}
