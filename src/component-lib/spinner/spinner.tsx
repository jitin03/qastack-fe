import React from 'react';
import classnames from 'classnames';

import * as Styled from './styles';
import * as customClasses from './classes';

export type SpinnerProps = React.ComponentPropsWithRef<'div'> & {
  size?: number;
  thickness?: number;
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 2.5, thickness = 4, className, ...props }, ref) => {
    const classes = classnames(customClasses.spinner, className);
    return (
      <Styled.Wrapper className={classes} ref={ref} {...props}>
        <Styled.Svg size={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <Styled.Circle
            fill="none"
            strokeWidth={thickness}
            strokeLinecap="round"
            cx="50"
            cy="50"
            r={50 - thickness / 2}
          />
        </Styled.Svg>
      </Styled.Wrapper>
    );
  },
);

Spinner.displayName = 'Spinner';

export default Spinner;
