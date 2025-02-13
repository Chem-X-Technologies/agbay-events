import { Link } from 'expo-router';
import { View } from 'react-native';
import { H3, Muted } from '~/components/ui/typography';
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
      <View className="p-4 gap-2">
        <H3>{event.name}</H3>
        <Muted>{`${formatDate(event.date)} ${formatTime(event.time)}`}</Muted>
      </View>
    </Link>
  );
}
