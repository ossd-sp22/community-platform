import { format } from 'date-fns'
import * as React from 'react'
import { Card, Flex } from 'theme-ui'
import Heading from 'src/components/Heading'
import { Link } from 'src/components/Links'
import { ModerationStatusText } from 'src/components/ModerationStatusText/ModerationStatustext'
import { Text } from 'theme-ui'
import type { IResearch } from 'src/models/research.models'
import theme from 'src/themes/styled.theme'
import { VerifiedUserBadge } from 'src/components/VerifiedUserBadge/VerifiedUserBadge'

interface IProps {
  item: IResearch.ItemDB
}

const ResearchListItem: React.FC<IProps> = ({ item }) => (
  <Card data-cy="research=list-item" data-id={item._id} mb={3}>
    <Flex sx={{ width: '100%', position: 'relative' }}>
      <Link
        to={`/research/${encodeURIComponent(item.slug)}`}
        key={item._id}
        sx={{ width: '100%' }}
      >
        <Flex px={3} py={3} sx={{ flexDirection: ['column', 'column', 'row'] }}>
          <Flex
            sx={{
              alignItems: 'center',
              width: ['100%', '100%', `${(1 / 2) * 100}%`],
            }}
          >
            <Heading small color={'black'}>
              {item.title}
            </Heading>
          </Flex>
          <Flex sx={{ alignItems: 'center', width: ['100%', '100%', '25%'] }}>
            <Text
              my={2}
              ml={1}
              color={`${theme.colors.blue} !important`}
              sx={{
                ...theme.typography.auxiliary,
              }}
            >
              {item._createdBy}
            </Text>
            <VerifiedUserBadge
              userId={item._createdBy}
              ml={1}
              height="12px"
              width="12px"
            />
          </Flex>
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: ['100%', '100%', '25%'],
            }}
          >
            <Text color="black">{getUpdateText(item)}</Text>
            <Text
              sx={{
                alignSelf:
                  item.moderation !== 'accepted' ? 'flex-start' : 'center',
                ...theme.typography.auxiliary,
              }}
            >
              {format(new Date(item._modified), 'DD-MM-YYYY')}
            </Text>
          </Flex>
        </Flex>
        {item.moderation !== 'accepted' && (
          <ModerationStatusText
            moderatedContent={item}
            contentType="research"
            bottom={['36px', '36px', 0]}
            cropBottomRight
          />
        )}
      </Link>
    </Flex>
  </Card>
)

const getUpdateText = (item: IResearch.ItemDB) => {
  const count = item.updates?.length || 0
  const text = count === 1 ? 'update' : 'updates'
  return `${count} ${text}`
}

export default ResearchListItem
