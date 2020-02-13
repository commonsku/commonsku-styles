import React from 'react'
import { renderClasses } from './utils'

export default function Component(props) {
    const allowed_classes = ['fade', 'margin']
    const classes = Object.keys(props)
      .filter(key => allowed_classes.includes(key))
      .reduce((obj, key) => {
        switch(typeof props[key]) {
          case 'number':
            obj[`${key}-${props[key]}`] = true;
          break;
          case 'boolean':
            if(props[key]) {
              obj[key] = props[key];
            }
          break;
          default: 
            obj[key] = props[key];
        }
        return obj;
      }, {})

    return (
      <div className={renderClasses(classes)}>
        {props.children}
      </div>
    )
  }