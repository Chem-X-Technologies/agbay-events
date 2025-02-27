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
  FormLabel,
  FormTimePicker,
} from '~/components/ui/form';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Muted } from '~/components/ui/typography';
import Poster from '~/lib/types/poster';

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
  poster: posterProp,
}: {
  onSubmit: (values: EventFormType, poster?: Poster) => void;
  loading: boolean;
  defaultValue?: EventFormType;
  poster?: Poster;
}) {
  const form = useForm<EventFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });
  const [poster, setPoster] = useState(posterProp);

  const pickPoster = () => {
    ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: false,
    }).then((result) => {
      if (!result.canceled) {
        const asset = result.assets[0];
        setPoster({
          id: '',
          url: asset.uri,
          fileName: asset.fileName ?? '',
        });
      }
    });
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
          <View className="flex-1">
            <FormLabel>Poster</FormLabel>
            {!!poster && (
              <>
                <Image
                  source={poster.url}
                  style={{
                    height: 300,
                  }}
                  contentFit="contain"
                />
                <Muted className="text-center mb-2">({poster.fileName})</Muted>
              </>
            )}
            <Button variant="outline" onPress={pickPoster}>
              <Text>Upload Image</Text>
            </Button>
          </View>
          <Button
            onPress={form.handleSubmit((data) => onSubmit(data, poster))}
            loading={loading}
          >
            <Text>Submit</Text>
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
}
