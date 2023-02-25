import useSWR from 'swr'

const useCameras = () => {
  const {data, error} = useSWR('https://floodfinder.org/api/status')

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useCameras
