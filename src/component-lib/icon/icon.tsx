import React from 'react';
import classnames from 'classnames';

import * as Styled from './styles';
import * as customClasses from './classes';
import { Colors } from '../utils/ais-defaults';

export type IconSize = 'small' | 'medium' | 'large';

export type IconProps = React.ComponentPropsWithRef<'span'> & {
  color?: Colors;
  name: string;
  size?: IconSize;
};

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ name, size = 'medium', color = 'inherit', className, ...props }, ref) => {
    const classes = classnames(customClasses.icon, 'material-icons', className);

    return (
      <Styled.IconWrapper className={classes} size={size} color={color} ref={ref} {...props}>
        {name}
      </Styled.IconWrapper>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
