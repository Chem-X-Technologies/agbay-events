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
        onChange(selectedDate ? formatTimeTo24Hour(selectedDate) : '')
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
        onChange(selectedDate ? formatTimeTo24Hour(selectedDate) : ''),
      mode: 'time',
      ...props,
    });
  };

  return showTimePickerAndroid;
}

export const formatTimeTo24Hour = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};
