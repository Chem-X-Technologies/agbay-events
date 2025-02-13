import RNDateTimePicker, {
  AndroidNativeProps,
  DateTimePickerAndroid,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import Override from '~/lib/types/override';

type FormTimePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TimePickerIos({
  show,
  value,
  onChange,
  ...props
}: Override<IOSNativeProps & { show: boolean }, FormTimePickerProps>) {
  return show ? (
    <RNDateTimePicker
      mode="time"
      value={!!value ? new Date(value) : new Date()}
      onChange={(_, selectedDate) =>
        onChange(selectedDate ? formatTimeTo12Hour(selectedDate) : '')
      }
      {...props}
    />
  ) : (
    <></>
  );
}

export function TimePickerAndroid(_: AndroidNativeProps) {
  return <></>;
}

export function useTimePickerAndroid({
  value,
  onChange,
  ...props
}: Override<AndroidNativeProps, FormTimePickerProps>) {
  const showTimePickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: !!value ? new Date(value) : new Date(),
      onChange: (_, selectedDate) =>
        onChange(selectedDate ? formatTimeTo12Hour(selectedDate) : ''),
      mode: 'time',
      ...props,
    });
  };

  return showTimePickerAndroid;
}

export const formatTimeTo12Hour = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${hours}:${minutes} ${period}`;
};
