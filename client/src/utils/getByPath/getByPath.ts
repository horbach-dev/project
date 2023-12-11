export default function getByPath (
  object: Record<string, any> | null | undefined,
  path: string | string[],
  defaultValue?: any,
) {
  if (!object) {
    return defaultValue
  }

  const pathArray = Array.isArray(path) ? path : toPath(path)
  let value: any = object

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < pathArray.length; i++) {
    const key = pathArray[i]

    if (!value || !value.hasOwnProperty(key)) {
      return defaultValue
    }

    value = value[key]
  }

  return value
}

function toPath (value) {
  if (Array.isArray(value)) {
    return value
  }

  return value.match(/[^.[\]]+/g) || []
}
