import { ScrollView, View } from 'react-native';
import {
  Form,
  FormCombobox,
  FormField,
  FormInput,
  FormInputNumber,
} from '~/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { AttendeeStatus } from '~/lib/types/attendee';
import { ATTENDEE_STATUS_LIST } from '~/lib/constants';
import { useState } from 'react';
import AttendeeMetadataInput from './AttendeeMetadataInput';
import { P } from '~/components/ui/typography';

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter the attendee's name",
  }),
  ticketCount: z.number().min(1, {
    message: 'Please enter the ticket count',
  }),
  status: z.string().default(AttendeeStatus.ForAttendance),
  metadata: z
    .array(
      z.object({
        key: z.string().min(1, {
          message: 'Please enter the field label',
        }),
        value: z.string().min(1, {
          message: 'Please enter the field value',
        }),
        isDeleted: z.boolean().optional(),
      })
    )
    .default([]),
});

export type AttendeeFormType = z.infer<typeof formSchema>;

export default function AttendeeForm({
  onSubmit,
  loading,
  defaultValue,
}: {
  onSubmit: (values: AttendeeFormType) => void;
  loading: boolean;
  defaultValue?: AttendeeFormType;
}) {
  const form = useForm<AttendeeFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });
  const [metadataCount, setMetadataCount] = useState(
    defaultValue?.metadata?.length ?? 0
  );
  const [deletedMetadataCount, setDeletedMetadataCount] = useState(0);

  const handleAddMetadata = () => {
    setMetadataCount((count) => count + 1);
  };

  const handleDeleteMetadata = () => {
    setDeletedMetadataCount((count) => count + 1);
  };

  return (
    <ScrollView className="p-6 mx-auto w-full max-w-xl bg-secondary">
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
          {!!defaultValue && (
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormCombobox
                  label="Status"
                  labelField="label"
                  valueField="value"
                  data={ATTENDEE_STATUS_LIST}
                  {...field}
                />
              )}
            />
          )}
          {metadataCount !== deletedMetadataCount && (
            <P className="font-bold">Custom Fields</P>
          )}
          {Array.from({ length: metadataCount }).map((_, index) => (
            <AttendeeMetadataInput
              key={index}
              control={form.control}
              index={index}
              onDelete={handleDeleteMetadata}
            />
          ))}
          <Button variant="link" onPress={handleAddMetadata}>
            <Text>Add custom field</Text>
          </Button>
          <Button onPress={form.handleSubmit(onSubmit)} loading={loading}>
            <Text>Submit</Text>
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
}
