import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormInput } from '~/components/ui/form';
import { View } from 'react-native';

const formSchema = z.object({
  name: z.string({
    message: 'Please enter the event name',
  }),
});

export default function CreateEventScreen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  return (
    <SafeAreaView className="flex-1">
      <Form {...form}>
        <View className="gap-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => <FormInput label="Name" {...field} />}
          />
        </View>
      </Form>
    </SafeAreaView>
  );
}
