import getByPath from '../getByPath'

const defaultValue = {
  user: {
    name: 'Tatiana',
    address: {
      city: 'Minsk',
      country: 'Belarus',
    },
  },
}

describe('get', () => {
  test('should retrieve nested value using dot notation', () => {
    expect(getByPath(defaultValue, 'user.name')).toBe('Tatiana')
    expect(getByPath(defaultValue, 'user.address.city')).toBe('Minsk')
  })

  test('should retrieve nested value using array of keys', () => {
    expect(getByPath(defaultValue, ['user', 'name'])).toBe('Tatiana')
    expect(getByPath(defaultValue, ['user', 'address', 'city'])).toBe('Minsk')
  })

  test('should return defaultValue if nested value is not found', () => {
    const obj = {
      user: {
        name: 'Tatiana',
      },
    }

    expect(getByPath(obj, 'user.address.city', 'N/A')).toBe('N/A')
    expect(getByPath(obj, 'user.address.zipCode', 'N/A')).toBe('N/A')
  })

  test('should return undefined if defaultValue is not provided', () => {
    const obj = {
      user: {
        name: 'Tatiana',
      },
    }

    expect(getByPath(obj, 'user.address.city')).toBeUndefined()
    expect(getByPath(obj, 'user.address.zipCode')).toBeUndefined()
  })
})
