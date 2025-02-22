import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormDatePicker,
  FormField,
  FormInput,
  FormInputNumber,
  FormTimePicker,
} from '~/components/ui/form';
import { ScrollView, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useRouter } from 'expo-router';
import { CreateAgbayEvent } from '~/lib/types/agbay-event';
import { createEvent } from '~/lib/services/eventService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Please enter the name',
  }),
  description: z.string().optional(),
  date: z.string().min(1, { message: 'Please enter the date' }),
  time: z.string().min(1, { message: 'Please enter the time' }),
  venue: z.string().min(1, { message: 'Please enter the venue' }),
  ticketPrice: z.number().min(1, {
    message: 'Please enter the ticket price',
  }),
  contactPerson: z.string().optional(),
  contactNumber: z.string().optional(),
});

export default function CreateEventScreen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      router.back();
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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

  return (
    <ScrollView
      contentContainerClassName="p-6 mx-auto w-full max-w-xl bg-secondary"
      showsVerticalScrollIndicator={false}
    >
      <Form {...form}>
        <View className="gap-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => <FormInput label="Name *" {...field} />}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => <FormInput label="Description" {...field} />}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => <FormDatePicker label="Date *" {...field} />}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => <FormTimePicker label="Time *" {...field} />}
          />
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => <FormInput label="Venue *" {...field} />}
          />
          <FormField
            control={form.control}
            name="ticketPrice"
            render={({ field }) => (
              <FormInputNumber
                label="Ticket Price *"
                placeholder="0.00"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormInput label="Contact Person" {...field} />
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormInput label="Contact Number" {...field} />
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
    </ScrollView>
  );
}
