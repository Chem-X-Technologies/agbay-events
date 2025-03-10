import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import EventListItem from '~/components/screens/events/EventListItem';
import EventListHeader from '~/components/screens/events/EventListHeader';
import { Separator } from '~/components/ui/separator';
import AgbayEvent from '~/lib/types/agbay-event';
import { getEvents } from '~/lib/services/eventService';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Large } from '~/components/ui/typography';
import { useCallback } from 'react';
import Footer from '~/components/shared/Footer';

export default function EventsScreen() {
  const { validate } = useLocalSearchParams<{ validate: string }>();
  const { data, isFetching } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (validate) {
        const attendeeId = validate;
        router.setParams({ validate: '' });
        router.push({
          pathname: '/attendees/validate/[id]',
          params: { id: attendeeId },
        });
      }
    }, [validate])
  );

  if (isFetching) {
    return <LoadingSpinner />;
  }

  const events = groupAndSortEvents(data ?? []);

  const stickyHeaderIndices = events
    .map((item, index) => {
      if (typeof item === 'string') {
        return index;
      } else {
        return null;
      }
    })
    .filter((item) => item !== null) as number[];

  return (
    <View className="flex-1 bg-secondary pb-4">
      {events.length > 0 ? (
        <FlashList
          data={events}
          renderItem={({ item }) => {
            if (typeof item === 'string') {
              // Rendering header
              return <EventListHeader header={item} />;
            } else {
              // Render item
              return <EventListItem event={item} />;
            }
          }}
          stickyHeaderIndices={stickyHeaderIndices}
          getItemType={(item) => {
            // To achieve better performance, specify the type based on the item
            return typeof item === 'string' ? 'sectionHeader' : 'row';
          }}
          ItemSeparatorComponent={() => <Separator />}
          estimatedItemSize={59}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-6">
          <Large className="text-muted-foreground font-normal">
            No events yet
          </Large>
        </View>
      )}
      <Footer />
    </View>
  );
}

const groupAndSortEvents = (events: AgbayEvent[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const groupedEvents: GroupedEvents = {
    today: [],
    futureEvents: [],
    pastEvents: [],
  };

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) {
      groupedEvents.today.push(event);
    } else if (eventDate > today) {
      groupedEvents.futureEvents.push(event);
    } else {
      groupedEvents.pastEvents.push(event);
    }
  });

  // Sort today events asc
  groupedEvents.today.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Sort future events asc
  groupedEvents.futureEvents.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Sort future events desc
  groupedEvents.pastEvents.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB.getTime() - dateA.getTime();
  });

  const result: (AgbayEvent | string)[] = [];

  if (groupedEvents.today.length > 0) {
    result.push('Events Today');
    result.push(...groupedEvents.today);
  }

  if (groupedEvents.futureEvents.length > 0) {
    result.push('Future Events');
    result.push(...groupedEvents.futureEvents);
  }

  if (groupedEvents.pastEvents.length > 0) {
    result.push('Past Events');
    result.push(...groupedEvents.pastEvents);
  }

  return result;
};

type GroupedEvents = {
  today: AgbayEvent[];
  futureEvents: AgbayEvent[];
  pastEvents: AgbayEvent[];
};
