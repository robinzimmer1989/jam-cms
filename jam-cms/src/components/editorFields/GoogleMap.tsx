import React, { useEffect } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'goog... Remove this comment to see the full error message
import GoogleMapReact from 'google-map-react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Geocode from 'react-geocode';
import { Typography, Input, Space } from 'antd';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { EnvironmentTwoTone as MarkerIcon } from '@ant-design/icons';

import { colors } from '../../theme';

const Marker = () => (
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Icon>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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

      // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
      if ((lat, lng)) {
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

  const handleGeocode = async (lat: any, lng: any) => {
    const result = await Geocode.fromLatLng(lat, lng);

    const { formatted_address } = result?.results?.[0];

    if (formatted_address) {
      onChange({
        address: formatted_address,
        lat,
        lng,
      });
    }
  };

  const handleChange = (e: any) => {
    onChange({ ...defaultValue, address: e.target.value });
  };

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    {site?.googleMapsApi ? (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Space direction="vertical">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Input.Search
          value={defaultValue.address}
          onChange={handleChange}
          onSearch={() => handleSearch(defaultValue.address)}
          placeholder={defaultValue?.address || 'Enter an address'}
        />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <MapContainer>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <GoogleMapReact
            height
            bootstrapURLKeys={{ key: site.googleMapsApi }}
            defaultCenter={{
              lat: 59.95,
              ln: 30.33,
            }}
            defaultZoom={11}
            center={[defaultValue?.lat, defaultValue?.lng]}
            onClick={({
              lat,
              lng
            }: any) => handleGeocode(lat, lng)}
          >
            {defaultValue?.lat && defaultValue?.lng && (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Marker lat={defaultValue.lat} lng={defaultValue.lng} />
            )}
          </GoogleMapReact>
        </MapContainer>
      </Space>
    ) : (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Typography>Please add GoogleMaps API key in settings.</Typography>
    )}
  </>;
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
