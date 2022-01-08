import { useState, useEffect } from 'react'
import { Animal, BreedListAPIResponse } from './APIResponsesType'

type Status = 'unloaded' | 'loading' | 'loaded'

const localCache: { [index: string]: string[] } = {}

const useBreedList = (animal: Animal): [string[], string] => {
  const [breedList, setBreedList] = useState([] as string[])
  const [status, setStatus] = useState('unloaded' as Status)

  useEffect(() => {
    if (!animal) {
      setBreedList([])
    } else if (localCache[animal]) {
      setBreedList(localCache[animal])
    } else {
      void requestBreedList()
    }
  }, [animal])

  async function requestBreedList() {
    setBreedList([])
    setStatus('loading')

    const response = await fetch(
      `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    )
    const json = (await response.json()) as BreedListAPIResponse

    localCache[animal] = json.breeds || []
    setBreedList(localCache[animal])
    setStatus('loaded')
  }

  return [breedList, status]
}

export default useBreedList
