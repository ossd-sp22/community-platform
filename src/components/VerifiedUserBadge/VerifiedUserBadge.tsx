import type { ImageProps } from 'theme-ui'
import { Image } from 'theme-ui'
import { useCommonStores } from 'src/index'
import VerifiedBadgeIcon from 'src/assets/icons/icon-verified-badge.svg'

interface IProps extends ImageProps {
  userId: string
}

/** Displays a verified user badge if passed userId is verified */
export const VerifiedUserBadge = (props: IProps) => {
  const { userId } = props
  const { aggregationsStore } = useCommonStores().stores
  const isVerified = aggregationsStore.aggregations.users_verified?.[userId]
  return isVerified ? (
    <Image
      src={VerifiedBadgeIcon}
      height={props.height}
      sx={{ width: props.height }}
      {...props}
    />
  ) : null
}
