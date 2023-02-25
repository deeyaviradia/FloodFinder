import L from 'leaflet'

const mapCctvIcon = (floodLevel) => {
  const iconSize = [25, 25]
  const blueCctvIcon = L.icon({
    iconUrl: '/cctv-icons/blue.png',
    iconRetinaUrl: '/cctv-icons/blue@2x.png',
    iconSize,
  })

  const yellowCctvIcon = L.icon({
    iconUrl: '/cctv-icons/yellow.png',
    iconRetinaUrl: '/cctv-icons/yellow@2x.png',
    iconSize,
  })

  const orangeCctvIcon = L.icon({
    iconUrl: '/cctv-icons/orange.png',
    iconRetinaUrl: '/cctv-icons/orange@2x.png',
    iconSize,
  })

  const redCctvIcon = L.icon({
    iconUrl: '/cctv-icons/red.png',
    iconRetinaUrl: '/cctv-icons/red@2x.png',
    iconSize,
  })

  switch (floodLevel) {
    case 0:
      return blueCctvIcon
    case 1:
      return yellowCctvIcon
    case 2:
      return orangeCctvIcon
    case 3:
      return redCctvIcon

    default:
      return blueCctvIcon
  }
}

export default mapCctvIcon
