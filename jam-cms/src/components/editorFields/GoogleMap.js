import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import { Typography, Input, Space } from 'antd';
import styled from 'styled-components';

import { colors } from '../../theme';

const Map = (props) => {
  const { site, value, onChange } = props;

  let defaultValue = value || { lat: 59.95, lng: 30.33, address: '' };

  const [search, setSearch] = useState(defaultValue.address);

  useEffect(() => {
    site?.googleMapsApi && Geocode.setApiKey(site.googleMapsApi);
  }, []);

  const handleSearch = async () => {
    try {
      const result = await Geocode.fromAddress(search);

      const {
        geometry: {
          location: { lat, lng },
        },
        formatted_address,
      } = result.results[0];

      setSearch(formatted_address);

      onChange({
        address: formatted_address,
        lat,
        lng,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {site?.googleMapsApi ? (
        <Space direction="vertical">
          <Input.Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={handleSearch}
            placeholder={defaultValue?.address || 'Enter an address'}
          />
          <MapContainer>
            <GoogleMapReact
              height
              bootstrapURLKeys={{ key: site.googleMapsApi }}
              defaultCenter={{
                lat: 59.95,
                ln: 30.33,
              }}
              defaultZoom={11}
              center={[defaultValue?.lat, defaultValue?.lng]}
            ></GoogleMapReact>
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

export default Map;
