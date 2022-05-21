import { Component } from 'react'
import { HiddenInputField } from 'src/components/Form/Fields'
import { Label, HiddenInput } from '../elements'
import { Image, Text } from 'theme-ui'

interface IProps {
  value: string
  index: number
  onChange: (index: number) => void
  isSelected: boolean
  imageSrc?: string
  btnLabel?: string
  fullWidth?: boolean
  'data-cy'?: string
  required?: boolean
}
interface IState {
  showDeleteModal: boolean
}

// validation - return undefined if no error (i.e. valid)
const isRequired = (value: any) => (value ? undefined : 'Required')

class CustomCheckbox extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      showDeleteModal: false,
    }
  }

  render() {
    const {
      value,
      index,
      imageSrc,
      isSelected,
      btnLabel,
      fullWidth,
      'data-cy': dataCy,
      required,
    } = this.props
    const classNames: Array<string> = []
    if (isSelected) {
      classNames.push('selected')
    }
    if (fullWidth) {
      classNames.push('full-width')
    }

    return (
      <Label
        htmlFor={value}
        sx={{ width: ['inherit', 'inherit', '100%'] }}
        className={classNames.join(' ')}
        data-cy={dataCy}
      >
        <HiddenInput
          name={value}
          id={value}
          value={value}
          onChange={() => this.props.onChange(index)}
          checked={isSelected}
          validate={required ? isRequired : undefined}
          validateFields={[]}
          type="checkbox"
          component={HiddenInputField}
        />
        {imageSrc && (
          <Image
            px={3}
            src={imageSrc}
            sx={{ width: ['70px', '70px', '100%'] }}
          />
        )}
        {btnLabel && (
          <Text sx={{ fontSize: 2 }} m="10px">
            {btnLabel}
          </Text>
        )}
      </Label>
    )
  }
}

export { CustomCheckbox }
