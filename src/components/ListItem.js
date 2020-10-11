import React from 'react'
import styled from 'styled-components'
import { Card, List, Typography } from 'antd'
import { Link } from 'gatsby'

const ListItem = props => {
  const { level = 0, link, actions, title, status } = props
  return (
    <Container level={level}>
      <Card>
        <List.Item actions={actions}>
          {link ? (
            <Link to={link}>
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
          )}
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
