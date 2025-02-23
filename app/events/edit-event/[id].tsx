import { useLocalSearchParams, useRouter } from 'expo-router';
import { EditAgbayEvent } from '~/lib/types/agbay-event';
import { editEvent, getEventById } from '~/lib/services/eventService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import EventForm, {
  EventFormType,
} from '~/components/screens/events/EventForm';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import { toast } from 'sonner-native';

export default function EditEventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: { id: string; event: EditAgbayEvent }) =>
      editEvent(payload.id, payload.event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`events/${id}`] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event updated successfully!');
      router.back();
    },
    onError: (error) => {
      toast.error(`Failed to update event: ${error.message}`);
    },
  });

  const { data, isFetching } = useQuery({
    queryKey: [`edit-event/${id}`],
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

    mutation.mutate({ id, event });
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
