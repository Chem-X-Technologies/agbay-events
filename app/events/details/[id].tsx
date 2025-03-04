import { View } from 'react-native';
import EventCard from '~/components/screens/events/EventCard';
import EventAttendeesList from '~/components/screens/events/EventAttendeesList';
import DeleteEventConfirmationDialog from '~/components/screens/events/DeleteEventConfirmationDialog';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getEventById } from '~/lib/services/eventService';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import { cn } from '~/lib/utils';
import { ImageBackground } from 'expo-image';
import AgbayEvent from '~/lib/types/agbay-event';
import Footer from '~/components/shared/Footer';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isFetching } = useQuery({
    queryKey: [`events/${id}`],
    queryFn: () => getEventById(id),
  });

  if (isFetching) return <LoadingSpinner />;

  const hasPoster = !!data?.poster;

  return hasPoster ? (
    <ImageBackground
      source={{ uri: data.poster?.url }}
      contentFit="cover"
      style={{ flex: 1 }}
    >
      <EventDetailsScreenContent eventId={id} data={data} />
    </ImageBackground>
  ) : (
    <EventDetailsScreenContent
      eventId={id}
      data={data}
      className="bg-secondary"
    />
  );
}

const EventDetailsScreenContent = ({
  eventId,
  data,
  className,
}: {
  eventId: string;
  data?: AgbayEvent;
  className?: string;
}) => {
  return (
    <>
      <View
        className={cn(
          'flex-1 p-4 items-center gap-6 justify-between',
          className
        )}
      >
        {!!data && <EventCard event={data} />}
        <EventAttendeesList eventId={eventId} />
        <Footer />
      </View>
      <DeleteEventConfirmationDialog />
    </>
  );
};
