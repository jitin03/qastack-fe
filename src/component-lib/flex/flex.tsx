import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

import * as Styled from './styles';
import * as customClasses from './classes';
import { FlexDirection, AlignItem, JustifyContent } from './types';

export type FlexProps = React.ComponentPropsWithRef<'div'> &
  PropsWithChildren<{
    alignItems?: AlignItem;
    direction?: FlexDirection;
    justifyContent?: JustifyContent;
    wrap?: boolean;
  }>;

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      alignItems = 'normal',
      justifyContent = 'normal',
      wrap = false,
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    const flexClasses = classnames(customClasses.flex, className);

    return (
      <Styled.Flex
        className={flexClasses}
        flexDirection={direction}
        alignItems={alignItems}
        justifyContent={justifyContent}
        flexWrap={wrap}
        ref={ref}
        {...props}
      >
        {children}
      </Styled.Flex>
    );
  },
);

Flex.displayName = 'Flex';

export const CompoundFlex = Flex as {
  Left: typeof Styled.Left;
  Right: typeof Styled.Right;
} & typeof Flex;

CompoundFlex.Left = Styled.Left;
CompoundFlex.Right = Styled.Right;

export default CompoundFlex;
