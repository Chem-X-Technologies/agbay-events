import React from 'react';
import NativeWindDropdown from '../shared/NativeWindDropdown';
import { Dropdown } from 'react-native-element-dropdown';
import { cn } from '~/lib/utils';

const Combobox = React.forwardRef<
  React.ElementRef<typeof Dropdown>,
  React.ComponentPropsWithoutRef<typeof NativeWindDropdown>
>(
  (
    {
      className,
      placeholderClassName,
      containerClassName,
      itemTextClassName,
      selectedTextClassName,
      activeColorClassName,
      ...props
    },
    ref
  ) => {
    return (
      <NativeWindDropdown
        ref={ref}
        className={cn(
          'web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
          props.disable && 'opacity-50 web:cursor-not-allowed',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        containerClassName={cn('bg-background', containerClassName)}
        itemTextClassName={cn('text-base text-foreground', itemTextClassName)}
        selectedTextClassName={cn(
          'text-base text-foreground',
          selectedTextClassName
        )}
        activeColorClassName={cn('bg-secondary', activeColorClassName)}
        {...props}
      />
    );
  }
);

Combobox.displayName = 'Combobox';

export { Combobox };
