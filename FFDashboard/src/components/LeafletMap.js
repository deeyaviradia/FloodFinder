import 'leaflet/dist/leaflet.css'
import {Alert, AlertIcon} from '@chakra-ui/alert'
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'
import {Heading} from '@chakra-ui/layout'
import {Table, Tbody, Tr, Td} from '@chakra-ui/table'
import CameraPopup from './CameraPopup'
import Loading from './Loading'
import PolylineDecorator from './PolylineDecorator'
import mapAttribution from '../constants/mapAttribution'
import mapCctvIcon from '../utils/mapCctvIcon'
import mapCenter from '../constants/mapCenter'
import mapUrl from '../constants/mapUrl'
import stormManholeData from '../data/stormManholes.json'
import stormPipeData from '../data/stormPipes.json'
import useCameras from '../hooks/useCameras'

const LeafletMap = () => {
  const {data, isLoading, isError} = useCameras()

  if (isLoading) {
    return <Loading message='Loading map...' />
  }

  if (isError) {
    return (
      <Alert status='error'>
        <AlertIcon />
        The map data is currently unavailable. Please try again later.
      </Alert>
    )
  }

  // Prepare camera data from the API
  let preparedCameraData = {
    type: 'FeatureCollection',
    features: [],
  }
  preparedCameraData.features = data.map((locationEntry) => {
    return {
      type: 'Feature',
      properties: {
        id: locationEntry.Id,
        floodLevel: locationEntry.isFlooded,
        locationName: locationEntry.locationName,
      },
      geometry: {
        type: 'Point',
        coordinates: [locationEntry.long, locationEntry.lat],
      },
    }
  })

  return (
    <MapContainer
      center={mapCenter}
      preferCanvas={true}
      scrollWheelZoom={true}
      style={{height: '100%', width: '100%'}}
      zoom={15}
    >
      <LayersControl position='topright'>
        <LayersControl.BaseLayer checked name='Streets'>
          <TileLayer
            attribution={mapAttribution}
            id='mapbox/streets-v11'
            url={mapUrl}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='Grayscale'>
          <TileLayer
            attribution={mapAttribution}
            id='mapbox/light-v9'
            url={mapUrl}
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name='Cameras'>
          <LayerGroup>
            {preparedCameraData.features.map((feature) => {
              return (
                <FeatureGroup key={feature.properties.id}>
                  <Marker
                    position={feature.geometry.coordinates}
                    icon={mapCctvIcon(feature.properties.floodLevel)}
                  />
                  <Popup>
                    <CameraPopup
                      lat={feature.geometry.coordinates[1]}
                      long={feature.geometry.coordinates[0]}
                    />
                  </Popup>
                </FeatureGroup>
              )
            })}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name='Storm Manholes'>
          <LayerGroup>
            {stormManholeData.features.map((feature) => {
              return (
                <FeatureGroup
                  key={feature.properties.OBJECTID}
                  pathOptions={{color: '#276749'}}
                >
                  <Popup>
                    <Heading as='h5' size='sm' marginBottom={3}>
                      Storm Manhole
                    </Heading>
                    <Table variant='striped' colorScheme='gray' size='sm'>
                      <Tbody>
                        <Tr>
                          <Td fontWeight='bold'>Facility ID</Td>
                          <Td>{feature.properties.FACILITYID}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight='bold'>DEM Elevation</Td>
                          <Td>{feature.properties.DEMELEV}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight='bold'>Rim Elevation</Td>
                          <Td>{feature.properties.RIMELEV}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight='bold'>Invert Elevation</Td>
                          <Td>{feature.properties.INVERTELEV}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight='bold'>Manhole Type</Td>
                          <Td>{feature.properties.MHTYPE}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight='bold'>Cover Type</Td>
                          <Td>{feature.properties.CVTYPE}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight='bold'>Wall Material</Td>
                          <Td>{feature.properties.WALLMAT}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight='bold'>Owned By</Td>
                          <Td>{feature.properties.OWNEDBY}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight='bold'>Latitude</Td>
                          <Td>{feature.geometry.coordinates[1]}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight='bold'>Longtitude</Td>
                          <Td>{feature.geometry.coordinates[0]}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Popup>
                  <Circle
                    center={[
                      feature.geometry.coordinates[1],
                      feature.geometry.coordinates[0],
                    ]}
                    radius={5}
                  />
                </FeatureGroup>
              )
            })}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name='Storm Pipes'>
          <LayerGroup>
            {stormPipeData.features.map((feature) => {
              return (
                <PolylineDecorator
                  arrowheads={{size: '15px'}}
                  key={feature.properties.OBJECTID}
                  pathOptions={{color: '#38A169'}}
                  smoothFactor={5}
                  positions={[
                    [
                      feature.geometry.coordinates[0][1],
                      feature.geometry.coordinates[0][0],
                    ],
		   [
                      feature.geometry.coordinates[1][1],
                      feature.geometry.coordinates[1][0],
                    ],
                  ]}
                />
              )
            })}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  )
}

export default LeafletMap
