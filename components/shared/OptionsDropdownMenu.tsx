import { Button } from '../ui/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EllipsisVertical } from '~/lib/icons/EllipsisVertical';
import { ReactNode } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function OptionsDropdownMenu({
  children,
}: {
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisVertical
            className="text-foreground"
            size={23}
            strokeWidth={2}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        insets={contentInsets}
        className="w-14 min-w-0 items-center p-2"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
