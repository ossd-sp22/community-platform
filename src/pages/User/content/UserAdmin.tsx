import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'oa-components'
import type { AdminStore } from 'src/stores/Admin/admin.store'
import type { IUser } from 'src/models/user.models'
import { AuthWrapper } from 'src/components/Auth/AuthWrapper'
import { Link } from 'react-router-dom'
import { Text } from 'theme-ui'

/*
    Button to request a user's email from the firebase auth database and open in default mail client
*/

interface IProps {
  user: IUser
  adminStore?: AdminStore
}
interface IState {
  disabled: boolean
  contactDetails?: string
}

@inject('adminStore')
@observer
export class UserAdmin extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { disabled: false }
  }
  getUserEmail = async () => {
    this.setState({ disabled: true, contactDetails: 'Requesting Email...' })
    const contactDetails = await this.props.adminStore!.getUserEmail(
      this.props.user,
    )
    this.setState({ disabled: false, contactDetails })
  }
  public render() {
    const { contactDetails, disabled } = this.state
    return (
      <AuthWrapper roleRequired={'admin'}>
        <Button
          disabled={disabled}
          onClick={this.getUserEmail}
          data-cy="UserAdminEmail"
        >
          Email
        </Button>
        <Link to={({ pathname }) => `${pathname}/edit`}>
          <Button data-cy="UserAdminEdit" ml={2}>
            Edit
          </Button>
        </Link>

        {contactDetails && (
          <Text mt={3}>
            <a href={`mailto:${contactDetails}`}>{contactDetails}</a>
          </Text>
        )}
      </AuthWrapper>
    )
  }
}
