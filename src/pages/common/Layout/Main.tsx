import type { FlexProps } from 'theme-ui';
import { Flex } from 'theme-ui'
import theme from 'src/themes/styled.theme'
import type { CSSObject } from '@styled-system/css'

interface ILayoutProps {
  ignoreMaxWidth?: boolean
  customStyles?: CSSObject
}

type IProps = FlexProps & ILayoutProps

const Main = (props: IProps) => (
  <Flex {...(props as any)} sx={{ flexDirection: 'column' }}>
    <Flex
      className="main-container"
      css={props.customStyles}
      sx={
        !props.ignoreMaxWidth
          ? {
              // Base css for all the pages, except Map & Academy
              position: 'relative',
              maxWidth: theme.maxContainerWidth,
              px: [2, 3, 4],
              mx: 'auto',
              my: 0,
              flexDirection: 'column',
              width: '100%',
            }
          : {
              flexDirection: 'column',
              width: '100%',
            }
      }
    >
      {props.children}
    </Flex>
  </Flex>
)

export default Main
