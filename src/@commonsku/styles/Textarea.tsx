import React from 'react'
import styled, { CSSObject } from 'styled-components'
import {Label} from './Label'
import { getThemeColor } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

type BaseTextareaProps = {
  noMargin?: boolean;
  error?: boolean;
  hasIcon?: boolean;
} & SharedStyleTypes;
export const Textarea = styled.textarea<BaseTextareaProps>`
  ${p => {
    const styles: CSSObject = {
      marginBottom: p.noMargin ? 0 : "1rem",
      fontSize: '1rem',
      fontFamily: "'skufont-regular', sans-serif",
      boxSizing: 'border-box',
      backgroundColor: getThemeColor(p, 'input.background'),
      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
      width: '100%',
      border: `1px solid ${getThemeColor(p, 'input.border')}`,
      borderRadius: '5px',
      padding: '8px 8px 8px 8px',
      color: getThemeColor(p, 'input.text'),
      "::placeholder": {
        color: getThemeColor(p, 'input.placeholder'),
      },
      ':hover': p.disabled ? undefined : {
        borderColor: getThemeColor(p, 'input.hover.border'),
        "::placeholder": {
          color: getThemeColor(p, 'input.hover.placeholder'),
        },
      },
      ':focus': {
        borderColor: getThemeColor(p, 'input.active.border'),
        color: getThemeColor(p, 'input.active.text'),
        outline: 'none',
        boxShadow: `1px  1px 0px ${getThemeColor(p, 'input.active.border')},
                   -1px -1px 0px ${getThemeColor(p, 'input.active.border')},
                    1px -1px 0px ${getThemeColor(p, 'input.active.border')},
                   -1px  1px 0px ${getThemeColor(p, 'input.active.border')};`,
      },
      ':disabled': {
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        color: getThemeColor(p, 'input.disabled.text'),
        backgroundColor: getThemeColor(p, 'input.disabled.background'),
      },
    };

    if (p.error) {
      styles['borderColor'] = getThemeColor(p, 'input.error.border');
      styles[':hover'] = {
        ...(styles[':hover'] || {}),
        borderColor: getThemeColor(p, 'input.error.border'),
      };
      styles[':focus'] = {
        color: getThemeColor(p, 'input.active.text'),
        outline: 'none',
        borderColor: getThemeColor(p, 'input.error.border'),
        boxShadow: `1px  1px 0px ${getThemeColor(p, 'input.error.border')},
                   -1px -1px 0px ${getThemeColor(p, 'input.error.border')},
                    1px -1px 0px ${getThemeColor(p, 'input.error.border')},
                   -1px  1px 0px ${getThemeColor(p, 'input.error.border')}`,
      }
    }

    if (p.hasIcon) {
      styles['border'] = 'none';
      styles['borderColor'] = 'none';
      styles['boxShadow'] = 'none';
      styles['outline'] = 'none';
      styles[':focus'] = undefined;
      styles[':hover'] = undefined;
    }

    return styles;
  }}

  ${SharedStyles}
`;

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>
  & BaseTextareaProps
  & {
    label: string,
    name?: string,
    noMargin?: boolean
  } & SharedStyleTypes;
export const LabeledTextarea: React.FC<TextareaProps> = React.forwardRef(
  ({ label, name, ...props}: TextareaProps, ref: React.Ref<HTMLTextAreaElement>) => {
    return <div>
      <Label htmlFor={name}>{label}</Label>
      <Textarea name={name} {...props}></Textarea>
    </div>
  }
);
