import React, { createRef, useEffect, useState } from 'react'
import Linkify from 'react-linkify'
import { Flex, Box } from 'theme-ui'
import type { IComment } from 'src/models'
import { CommentHeader } from './CommentHeader'
import { Text } from 'theme-ui'
import { Modal } from '../Modal/Modal'
import { Button } from 'oa-components'
import { AuthWrapper } from '../Auth/AuthWrapper'
import FormEditComment from '../FormEditComment/FormEditComment'

export interface IProps extends IComment {
  handleEditRequest
  handleDelete
  handleEdit
}

export const Comment: React.FC<IProps> = ({
  _creatorId,
  text,
  _id,
  handleEditRequest,
  handleDelete,
  handleEdit,
  ...props
}) => {
  const textRef = createRef<any>()
  const [showEditModal, setShowEditModal] = useState(false)
  const [textHeight, setTextHeight] = useState(0)
  const [isShowMore, setShowMore] = useState(false)

  const onEditRequest = () => {
    handleEditRequest()
    return setShowEditModal(true)
  }

  const onDelete = () => {
    handleDelete(_id)
  }

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.scrollHeight)
    }
  }, [text])

  const showMore = () => {
    setShowMore(!isShowMore)
  }

  return (
    <Box data-cy="comment">
      <Flex
        p="3"
        bg={'white'}
        mb={4}
        sx={{
          width: '100%',
          flexDirection: 'column',
          borderRadius: '5px',
        }}
      >
        <CommentHeader {...props} />
        <Text
          data-cy="comment-text"
          mt={2}
          mb={2}
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflow: 'hidden',
            lineHeight: '1em',
            maxHeight: isShowMore ? 'max-content' : '128px',
          }}
          ref={textRef}
        >
          <Linkify properties={{ target: '_blank' }}>{text}</Linkify>
        </Text>
        {textHeight > 129 && (
          <a
            onClick={showMore}
            style={{
              color: 'gray',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {isShowMore ? 'Show less' : 'Show more'}
          </a>
        )}
        <Flex ml="auto">
          <AuthWrapper roleRequired="admin" additionalAdmins={[_creatorId]}>
            <Button
              variant={'outline'}
              small={true}
              icon={'edit'}
              onClick={onEditRequest}
            >
              edit
            </Button>
            <Button
              variant={'outline'}
              small={true}
              icon="delete"
              onClick={onDelete}
              ml={2}
            >
              delete
            </Button>
          </AuthWrapper>
        </Flex>

        {showEditModal && (
          <Modal width={600}>
            <FormEditComment
              comment={text}
              handleSubmit={(commentText) => {
                handleEdit(_id, commentText)
                setShowEditModal(false)
              }}
              handleCancel={() => setShowEditModal(false)}
            />
          </Modal>
        )}
      </Flex>
    </Box>
  )
}
