import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { Large } from '~/components/ui/typography';
import { cn } from '~/lib/utils';

export default function AttendanceCounter({
  attendedCount,
  attendeesCount,
}: {
  attendedCount: number;
  attendeesCount: number;
}) {
  return (
    <Tooltip disableHoverableContent>
      <View className="flex-row gap-3 items-center">
        <View
          className={cn(
            'rounded-full p-3',
            attendedCount > 0 ? 'bg-green-400 ' : 'bg-gray-600'
          )}
        />
        <TooltipTrigger className="flex-row">
          <Large
            className={attendedCount > 0 ? 'text-green-400' : 'text-foreground'}
          >
            {attendedCount}
          </Large>
          <Large>/</Large>
          <Large>{attendeesCount}</Large>
        </TooltipTrigger>
      </View>
      <TooltipContent>
        <Text>No. of attended over total expected attendees</Text>
      </TooltipContent>
    </Tooltip>
  );
}
