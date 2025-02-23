import { useLocalSearchParams, useRouter } from 'expo-router';
import { EditAgbayEvent } from '~/lib/types/agbay-event';
import { editEvent, getEventById } from '~/lib/services/eventService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import EventForm, {
  EventFormType,
} from '~/components/screens/events/EventForm';
import LoadingSpinner from '~/components/shared/LoadingSpinner';

export default function EditEventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (event: EditAgbayEvent) => editEvent(id, event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`events/${id}`] });
      router.back();
    },
  });

  const { data, isFetching } = useQuery({
    queryKey: [`events/${id}`],
    queryFn: () => getEventById(id),
  });

  const handleSubmit = (values: EventFormType) => {
    const event: EditAgbayEvent = {
      name: values.name,
      description: values.description,
      date: values.date,
      time: values.time,
      venue: values.venue,
      ticketPrice: values.ticketPrice,
      contactPerson: values.contactPerson,
      contactNumber: values.contactNumber,
    };

    mutation.mutate(event);
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <EventForm
      onSubmit={handleSubmit}
      loading={mutation.isPending}
      defaultValue={data}
    />
  );
}
