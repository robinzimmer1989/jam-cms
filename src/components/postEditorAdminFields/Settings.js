import React from 'react'
import styled from 'styled-components'
import { Popover, Space, Select } from 'antd'
import { ChromePicker } from 'react-color'

// import app components
import Caption from '../Caption'

const Settings = (props) => {
  const { value, onChange } = props

  const defaultValue = {
    marginTop: 'none',
    marginBottom: 'none',
    paddingTop: 'none',
    paddingBottom: 'none',
    backgroundColor: 'transparent',
    edges: 'none',
  }

  const options = [
    { name: 'None', value: 'none' },
    { name: 'Small', value: 'sm' },
    { name: 'Medium', value: 'md' },
    { name: 'Large', value: 'lg' },
  ]

  const handleChange = (name, newValue) => {
    onChange({ ...value, [name]: newValue })
  }

  const getPicker = () => (
    <StyledChromePicker
      color={value?.backgroundColor || defaultValue.backgroundColor}
      onChange={(newValue) => handleChange('backgroundColor', newValue.hex)}
    />
  )

  return (
    <>
      <Space direction="vertical" size={20}>
        <div>
          <Caption children="Margin Top" />
          <Select
            defaultValue={value?.marginTop || defaultValue.marginTop}
            onChange={(newValue) => handleChange('marginTop', newValue)}
          >
            {options.map((o) => (
              <Select.Option key={o.value} value={o.value} children={o.name} />
            ))}
          </Select>
        </div>

        <div>
          <Caption children="Margin Bottom" />
          <Select
            defaultValue={value?.marginBottom || defaultValue.marginBottom}
            onChange={(newValue) => handleChange('marginBottom', newValue)}
          >
            {options.map((o) => (
              <Select.Option key={o.value} value={o.value} children={o.name} />
            ))}
          </Select>
        </div>

        <div>
          <Caption children="Padding Top" />
          <Select
            defaultValue={value?.paddingTop || defaultValue.paddingTop}
            onChange={(newValue) => handleChange('paddingTop', newValue)}
          >
            {options.map((o) => (
              <Select.Option key={o.value} value={o.value} children={o.name} />
            ))}
          </Select>
        </div>

        <div>
          <Caption children="Padding Bottom" />
          <Select
            defaultValue={value?.paddingBottom || defaultValue.paddingBottom}
            onChange={(newValue) => handleChange('paddingBottom', newValue)}
          >
            {options.map((o) => (
              <Select.Option key={o.value} value={o.value} children={o.name} />
            ))}
          </Select>
        </div>

        <div>
          <Caption children="Edges" />
          <Select
            defaultValue={value?.edges || defaultValue.edges}
            onChange={(newValue) => handleChange('edges', newValue)}
          >
            {options.map((o) => (
              <Select.Option key={o.value} value={o.value} children={o.name} />
            ))}
          </Select>
        </div>

        <div>
          <Caption children="Background Color" />
          <Popover content={getPicker()} title="Background Color" trigger="click">
            <Swatch value={value?.backgroundColor || defaultValue.backgroundColor} />
          </Popover>
        </div>
      </Space>
    </>
  )
}

const StyledChromePicker = styled(ChromePicker)`
  box-shadow: none !important;
`

const Swatch = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  background-color: ${(props) => props.value};
  border-radius: 4px;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  cursor: pointer;
`

export default Settings
