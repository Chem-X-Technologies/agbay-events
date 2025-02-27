import { useRouter } from 'expo-router';
import { CreateAgbayEvent } from '~/lib/types/agbay-event';
import { createEvent } from '~/lib/services/eventService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EventForm, {
  EventFormType,
} from '~/components/screens/events/EventForm';
import { toast } from 'sonner-native';
import { uploadFile } from '~/lib/services/storageService';
import { useState } from 'react';
import * as Crypto from 'expo-crypto';
import Poster from '~/lib/types/poster';
import { uriToBlob } from '~/lib/utils';

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
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (values: EventFormType, poster?: Poster) => {
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

    if (poster) {
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
            mutation.mutate(event);
          })
          .catch(() => toast.error('Failed to upload poster'))
          .finally(() => setUploading(false));
      });
    } else {
      mutation.mutate(event);
    }
  };

  const loading = mutation.isPending || uploading;

  return <EventForm onSubmit={handleSubmit} loading={loading} />;
}
