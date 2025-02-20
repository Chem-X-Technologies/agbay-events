import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as z from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormField,
  FormInput,
  FormInputNumber,
} from '~/components/ui/form';
import { Text } from '~/components/ui/text';
import { createAttendee } from '~/lib/services/attendeeService';
import Attendee, { AttendeeStatus } from '~/lib/types/attendee';

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter the attendee's name",
  }),
  ticketCount: z.number().min(1, {
    message: 'Please enter the ticket count',
  }),
});

export default function CreateAttendeeScreen() {
  const { eventId } = useLocalSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createAttendee,
    onSuccess: (attendee) => {
      queryClient.invalidateQueries({
        queryKey: [`attendees?eventId=${eventId}`],
      });
      router.replace({
        pathname: '/attendees/details/[id]',
        params: { id: attendee.id as string },
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const attendee: Attendee = {
      id: '',
      name: values.name,
      ticketCount: values.ticketCount,
      status: AttendeeStatus.ForAttendance,
      eventId: eventId as string,
    };

    mutation.mutate(attendee);
  };

  return (
    <View className="flex-1 p-6 mx-auto w-full max-w-xl bg-secondary">
      <Form {...form}>
        <View className="gap-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormInput label="Attendee Name *" {...field} />
            )}
          />
          <FormField
            control={form.control}
            name="ticketCount"
            render={({ field }) => (
              <FormInputNumber
                label="Ticket Count *"
                placeholder="0"
                {...field}
              />
            )}
          />
          <Button
            onPress={form.handleSubmit(onSubmit)}
            loading={mutation.isPending}
          >
            <Text>Submit</Text>
          </Button>
        </View>
      </Form>
    </View>
  );
}
