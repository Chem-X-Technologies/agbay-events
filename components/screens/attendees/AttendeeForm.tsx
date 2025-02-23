import { View } from 'react-native';
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

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter the attendee's name",
  }),
  ticketCount: z.number().min(1, {
    message: 'Please enter the ticket count',
  }),
  status: z.string().default(AttendeeStatus.ForAttendance),
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
          {!!defaultValue && (
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormCombobox
                  label="Status"
                  labelField="label"
                  valueField="value"
                  data={[
                    {
                      label: AttendeeStatus.ForAttendance,
                      value: AttendeeStatus.ForAttendance,
                    },
                    {
                      label: AttendeeStatus.Attended,
                      value: AttendeeStatus.Attended,
                    },
                    {
                      label: AttendeeStatus.NoShow,
                      value: AttendeeStatus.NoShow,
                    },
                  ]}
                  {...field}
                />
              )}
            />
          )}
          <Button onPress={form.handleSubmit(onSubmit)} loading={loading}>
            <Text>Submit</Text>
          </Button>
        </View>
      </Form>
    </View>
  );
}
