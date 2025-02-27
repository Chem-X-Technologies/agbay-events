import { View } from 'react-native';
import { H3 } from '../ui/typography';
import { cn } from '~/lib/utils';

export default function FlashListHeader({
  text,
  headerRight,
  className,
}: {
  text: string;
  headerRight?: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={cn('p-4 flex-row justify-between items-center', className)}
    >
      <H3 className="text-center">{text}</H3>
      {!!headerRight && headerRight}
    </View>
  );
}
