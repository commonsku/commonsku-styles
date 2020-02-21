import _ from 'lodash'

export const renderClasses = (props) => {
  let classes = ''
  _.each(props, (val, key) => {
    if (val) {
      classes += `${key} `
    }
  })
  return classes
}