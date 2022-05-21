import { getSupportedProfileTypes, ProfileType } from 'src/modules/profile'

// Highlights
import CollectionHighlight from 'src/assets/images/highlights/highlight-collection-point.svg'
import LocalCommunityHighlight from 'src/assets/images/highlights/highlight-local-community.svg'
import MachineHighlight from 'src/assets/images/highlights/highlight-machine-shop.svg'
import WorkspaceHighlight from 'src/assets/images/highlights/highlight-workspace.svg'
import MemberHighlight from 'src/assets/images/highlights/highlight-member.svg'

// assets profileType
import MemberBadge from 'src/assets/images/badges/pt-member.svg'

function findWordspaceHighlight(workspaceType?: string): string {
  switch (workspaceType) {
    case ProfileType.WORKSPACE:
      return WorkspaceHighlight
    case ProfileType.MEMBER:
      return MemberHighlight
    case ProfileType.MACHINE_BUILDER:
      return MachineHighlight
    case ProfileType.COMMUNITY_BUILDER:
      return LocalCommunityHighlight
    case ProfileType.COLLECTION_POINT:
      return CollectionHighlight
    default:
      return MemberHighlight
  }
}

function findWorkspaceBadgeNullable(
  workspaceType?: string,
  useCleanImage?: boolean,
): string | null {
  if (!workspaceType) {
    return null
  }

  const foundProfileTypeObj = getSupportedProfileTypes().find(
    (type) => type.label === workspaceType,
  )

  if (!foundProfileTypeObj) {
    return null
  }

  if (useCleanImage && foundProfileTypeObj.cleanImageSrc) {
    return foundProfileTypeObj.cleanImageSrc
  }

  return foundProfileTypeObj.imageSrc || null
}

function findWorkspaceBadge(
  workspaceType?: string,
  ifCleanImage?: boolean,
  verifiedUser?: boolean,
): string {
  if (!workspaceType) {
    return MemberBadge
  }

  const foundProfileTypeObj = getSupportedProfileTypes().find(
    (type) => type.label === workspaceType,
  )
  if (foundProfileTypeObj) {
    if (ifCleanImage) {
      if (verifiedUser && foundProfileTypeObj.cleanImageVerifiedSrc) {
        return foundProfileTypeObj.cleanImageVerifiedSrc
      } else if (foundProfileTypeObj.cleanImageSrc) {
        return foundProfileTypeObj.cleanImageSrc
      }
    }
    if (foundProfileTypeObj.imageSrc) {
      return foundProfileTypeObj.imageSrc
    }
  }

  return MemberBadge
}

export default {
  findWordspaceHighlight,
  findWorkspaceBadge,
  findWorkspaceBadgeNullable,
}
