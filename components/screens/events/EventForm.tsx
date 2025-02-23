import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import * as z from 'zod';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import {
  Form,
  FormDatePicker,
  FormField,
  FormInput,
  FormInputNumber,
  FormTimePicker,
} from '~/components/ui/form';

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

export type EventFormType = z.infer<typeof formSchema>;

export default function EventForm({
  onSubmit,
  loading,
  defaultValue,
}: {
  onSubmit: (values: EventFormType) => void;
  loading: boolean;
  defaultValue?: EventFormType;
}) {
  const form = useForm<EventFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });

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
          <Button onPress={form.handleSubmit(onSubmit)} loading={loading}>
            <Text>Submit</Text>
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
}
