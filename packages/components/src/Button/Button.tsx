import * as React from 'react'
import { Icon } from '../Icon/Icon'
import type { IGlyphs } from '../Icon/types'
import type { ButtonProps as ThemeUiButtonProps } from 'theme-ui'
import { Button as ThemeUiButton } from 'theme-ui'
import styled from '@emotion/styled'

// extend to allow any default button props (e.g. onClick) to also be passed
export interface IBtnProps extends React.ButtonHTMLAttributes<HTMLElement> {
  icon?: keyof IGlyphs
  disabled?: boolean
  translateY?: boolean
  small?: boolean
  medium?: boolean
  large?: boolean
  hasText?: boolean
}

const small = (props: IBtnProps) =>
  props.small
    ? {
        padding: '4px 10px!important',
      }
    : null

const medium = (props: IBtnProps) =>
  props.medium
    ? {
        padding: '6px 12px!important',
      }
    : null

const large = (props: IBtnProps) =>
  props.large
    ? {
        padding: '8px 14px!important',
      }
    : null

const translateY = (props: IBtnProps) =>
  props.translateY
    ? {
        '&:hover': {
          transform: 'translateY(-5px)',
        },
        '&:focus': {
          outline: 'none',
        },
      }
    : null

export type BtnProps = IBtnProps & ThemeUiButtonProps

const BaseButton = styled(ThemeUiButton, {
  // avoid passing custom props
  shouldForwardProp: (prop: keyof IBtnProps) =>
    !['translateY', 'small', 'medium', 'large'].includes(prop),
})`
  ${translateY}
  ${small}
  ${medium}
  ${large}
`

export const Button = (props: BtnProps) => {
  return (
    <BaseButton {...props}>
      {props.icon && <Icon glyph={props.icon} marginRight="4px" />}
      <span>{props.children}</span>
    </BaseButton>
  )
}

Button.defaultProps = {
  type: 'button',
}
