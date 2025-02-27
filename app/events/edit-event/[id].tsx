import { useLocalSearchParams, useRouter } from 'expo-router';
import { EditAgbayEvent } from '~/lib/types/agbay-event';
import { editEvent, getEventById } from '~/lib/services/eventService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import EventForm, {
  EventFormType,
} from '~/components/screens/events/EventForm';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import { toast } from 'sonner-native';
import { uriToBlob } from '~/lib/utils';
import { uploadFile } from '~/lib/services/storageService';
import { useState } from 'react';
import * as Crypto from 'expo-crypto';
import Poster from '~/lib/types/poster';

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
  const [uploading, setUploading] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: [`edit-event/${id}`],
    queryFn: () => getEventById(id),
  });

  const handleSubmit = (values: EventFormType, poster?: Poster) => {
    const event: EditAgbayEvent = {
      name: values.name,
      description: values.description,
      date: values.date,
      time: values.time,
      venue: values.venue,
      ticketPrice: values.ticketPrice,
      contactPerson: values.contactPerson,
      contactNumber: values.contactNumber,
      poster,
    };

    if (poster && !poster.id) {
      setUploading(true);
      const posterId = Crypto.randomUUID();

      uriToBlob(poster.url).then((blob) => {
        uploadFile(posterId, blob)
          .then((posterUrl) => {
            event.poster = {
              id: posterId,
              url: posterUrl,
              fileName: poster.fileName,
            };
            mutation.mutate({ id, event });
          })
          .catch(() => toast.error('Failed to upload poster'))
          .finally(() => setUploading(false));
      });
    } else {
      mutation.mutate({ id, event });
    }
  };

  if (isFetching) return <LoadingSpinner />;

  const loading = mutation.isPending || uploading;

  return (
    <EventForm
      onSubmit={handleSubmit}
      loading={loading}
      defaultValue={data}
      poster={data?.poster}
    />
  );
}
