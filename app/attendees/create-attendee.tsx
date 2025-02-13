import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import * as z from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormField,
  FormInput,
  FormInputNumber,
} from '~/components/ui/form';
import { Text } from '~/components/ui/text';
import { MOCK_EVENTS } from '~/lib/constants';
import { AttendeeStatus } from '~/lib/types/attendee';

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
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticketCount: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const event = MOCK_EVENTS.find((e) => e.id === eventId);

    if (!event) return;

    event.attendees.push({
      id: `${event.attendees.length + 1}`,
      name: values.name,
      ticketCount: values.ticketCount,
      status: AttendeeStatus.ForAttendance,
    });

    router.push(`/events/details/${eventId}`);
  };

  return (
    <ScrollView
      contentContainerClassName="p-6 mx-auto w-full max-w-xl bg-secondary/30"
      showsVerticalScrollIndicator={false}
    >
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
              <FormInputNumber label="Ticket Count *" {...field} />
            )}
          />
          <Button onPress={form.handleSubmit(onSubmit)}>
            <Text>Submit</Text>
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
}
