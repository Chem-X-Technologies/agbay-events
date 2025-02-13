import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormDatePicker,
  FormField,
  FormInput,
  FormTimePicker,
} from '~/components/ui/form';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { MOCK_EVENTS } from '~/lib/constants';
import { useRouter } from 'expo-router';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Please enter the event name',
  }),
  date: z.string().min(1, { message: 'Please enter the event date' }),
  time: z.string().min(1, { message: 'Please enter the event time' }),
});

export default function CreateEventScreen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    // MOCK_EVENTS.push({
    //   id: `${MOCK_EVENTS.length + 1}`,
    //   name: values.name,
    // });

    // router.push('/');
  };

  return (
    <View className="flex-1 p-4 bg-secondary/30">
      <Form {...form}>
        <View className="gap-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => <FormInput label="Name" {...field} />}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => <FormDatePicker label="Date" {...field} />}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => <FormTimePicker label="Time" {...field} />}
          />
          <Button onPress={form.handleSubmit(onSubmit)}>
            <Text>Submit</Text>
          </Button>
        </View>
      </Form>
    </View>
  );
}
