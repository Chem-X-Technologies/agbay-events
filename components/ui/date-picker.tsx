import RNDateTimePicker, {
  AndroidNativeProps,
  DateTimePickerAndroid,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import Override from '~/lib/types/override';

type FormDatePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DatePickerIos({
  show,
  value,
  onChange,
  ...props
}: Override<IOSNativeProps & { show: boolean }, FormDatePickerProps>) {
  return show ? (
    <RNDateTimePicker
      mode="date"
      value={!!value ? new Date(value) : new Date()}
      onChange={(_, selectedDate) =>
        onChange(selectedDate ? formatDateToISO(selectedDate) : '')
      }
      {...props}
    />
  ) : (
    <></>
  );
}

export function DatePickerAndroid(_: AndroidNativeProps) {
  return <></>;
}

export function useDatePickerAndroid({
  value,
  onChange,
  ...props
}: Override<AndroidNativeProps, FormDatePickerProps>) {
  const showDatePickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: !!value ? new Date(value) : new Date(),
      onChange: (_, selectedDate) =>
        onChange(selectedDate ? formatDateToISO(selectedDate) : ''),
      mode: 'date',
      ...props,
    });
  };

  return showDatePickerAndroid;
}

function formatDateToISO(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
