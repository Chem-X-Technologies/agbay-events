import { useRouter } from 'expo-router';
import { CreateAgbayEvent } from '~/lib/types/agbay-event';
import { createEvent } from '~/lib/services/eventService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EventForm, {
  EventFormType,
} from '~/components/screens/events/EventForm';
import { toast } from 'sonner-native';

export default function CreateEventScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event created successfully!');
      router.back();
    },
    onError: (error) => {
      toast.error(`Failed to create event: ${error.message}`);
    },
  });

  const handleSubmit = (values: EventFormType) => {
    const event: CreateAgbayEvent = {
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

  return <EventForm onSubmit={handleSubmit} loading={mutation.isPending} />;
}
