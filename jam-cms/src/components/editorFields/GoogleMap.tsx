import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import { Typography, Input, Space } from 'antd';
import styled from 'styled-components';
import { EnvironmentTwoTone as MarkerIcon } from '@ant-design/icons';

// import app components
import { colors } from '../../theme';

const Marker = () => (
  <Icon>
    <MarkerIcon />
  </Icon>
);

const Map = (props: any) => {
  const { site, value, onChange } = props;

  let defaultValue = value || { lat: 59.95, lng: 30.33, address: '' };

  useEffect(() => {
    site?.googleMapsApi && Geocode.setApiKey(site.googleMapsApi);
  }, []);

  const handleSearch = async (address: any) => {
    try {
      const result = await Geocode.fromAddress(address);

      const {
        geometry: {
          location: { lat, lng },
        },
        formatted_address,
      } = result?.results?.[0];

      if (lat && lng) {
        onChange({
          address: formatted_address || '',
          lat,
          lng,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGeocode = async (lat: string, lng: string) => {
    try {
      const result = await Geocode.fromLatLng(lat, lng);

      const { formatted_address } = result?.results?.[0];

      if (formatted_address) {
        onChange({
          address: formatted_address,
          lat,
          lng,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: any) => onChange({ ...defaultValue, address: e.target.value });

  return (
    <>
      {site?.googleMapsApi ? (
        <Space direction="vertical">
          <Input.Search
            value={defaultValue.address}
            onChange={handleChange}
            onSearch={() => handleSearch(defaultValue.address)}
            placeholder={defaultValue?.address || 'Search location'}
          />
          <MapContainer>
            <GoogleMapReact
              bootstrapURLKeys={{ key: site.googleMapsApi }}
              defaultCenter={{
                lat: 59.95,
                lng: 30.33,
              }}
              defaultZoom={11}
              center={{ lat: defaultValue?.lat || 59.95, lng: defaultValue?.lng || 30.33 }}
              onClick={({ lat, lng }: any) => handleGeocode(lat, lng)}
            >
              {defaultValue?.lat && defaultValue?.lng && <Marker />}
            </GoogleMapReact>
          </MapContainer>
        </Space>
      ) : (
        <Typography>Please add GoogleMaps API key in settings.</Typography>
      )}
    </>
  );
};

const MapContainer = styled.div`
  height: 220px;
  width: 100%;
  background: ${colors.tertiary};
`;

const Icon = styled.div`
  svg {
    height: 26px;
    width: 20px;
  }
`;

export default Map;
