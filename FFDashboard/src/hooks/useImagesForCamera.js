import useSWR from 'swr'

const useImagesForCamera = (lat, long) => {
  const {data, error} = useSWR(
    `https://floodfinder.org/api/latest?lat=${lat}&long=${long}`
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useImagesForCamera
