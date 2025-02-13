import { Link } from 'expo-router';
import { View } from 'react-native';
import { Large, Muted } from '~/components/ui/typography';
import AgbayEvent from '~/lib/types/agbay-event';
import { formatDate, formatTime } from '~/lib/utils';

export default function EventListItem({ event }: { event: AgbayEvent }) {
  return (
    <Link
      href={{
        pathname: '/events/details/[id]',
        params: { id: event.id },
      }}
    >
      <View className="p-4 gap-2 bg-background w-full">
        <Large>{event.name}</Large>
        <Muted>{`${formatDate(event.date)} ${formatTime(event.time)}`}</Muted>
      </View>
    </Link>
  );
}
