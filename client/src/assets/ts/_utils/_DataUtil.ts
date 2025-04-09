export class DataUtil {
  static store: Map<HTMLElement, Map<string, unknown>> = new Map()

  public static set(
    instance: HTMLElement,
    key: string,
    data: unknown
  ): void {
    if (!instance) {
      return
    }

    const instanceData = DataUtil.store.get(instance)
    if (!instanceData) {
      const newMap = new Map().set(key, data)
      DataUtil.store.set(instance, newMap)
      return
    }

    instanceData.set(key, data)
  }

  public static get(instance: HTMLElement, key: string): unknown | undefined {
    const instanceData = DataUtil.store.get(instance)
    if (!instanceData) {
      return
    }

    return instanceData.get(key)
  }

  public static remove(instance: HTMLElement, key: string): void {
    const instanceData = DataUtil.store.get(instance)
    if (!instanceData) {
      return
    }

    instanceData.delete(key)
  }

  public static removeOne(instance: HTMLElement, key: string, eventId: string) {
    const instanceData = DataUtil.get(instance, key)
    if (!instanceData) {
      return
    }

    const ids = instanceData as string[]
    const index = ids.indexOf(eventId)
    if (index > -1) {
      ids.splice(index, 1)
    }
  }

  public static has(instance: HTMLElement, key: string): boolean {
    const instanceData = DataUtil.store.get(instance)
    if (instanceData) {
      return instanceData.has(key)
    }

    return false
  }

  public static getAllInstancesByKey(key: string) {
    const result: any[] = []
    DataUtil.store.forEach((val) => {
      val.forEach((v, k) => {
        if (k === key) {
          result.push(v)
        }
      })
    })
    return result
  }
} 