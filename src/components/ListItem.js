import React from 'react'
import styled from 'styled-components'
import { Card, List, Typography } from 'antd'
import { Link } from 'gatsby'

// import app components
import Image from 'components/Image'

const ListItem = props => {
  const { level = 0, link, actions, title, subtitle, status, image, hideImage } = props

  const metaTitle = link ? (
    <Link to={link} style={{ flex: 1 }}>
      <Typography.Text strong>
        {title}
        {status}
      </Typography.Text>
    </Link>
  ) : (
    <Typography.Text strong>
      {title}
      {status}
    </Typography.Text>
  )

  return (
    <Container level={level}>
      <Card>
        <List.Item actions={actions}>
          <List.Item.Meta
            avatar={!hideImage && <Image width={50} height={50} image={image} bg />}
            title={metaTitle}
            description={subtitle}
          />
        </List.Item>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  margin-left: ${({ level }) => `${level * 30}px`};
  margin-bottom: 20px;

  .ant-card-body {
    padding: 0 20px;
  }
`

export default ListItem
