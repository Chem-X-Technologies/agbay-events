import RNDateTimePicker, {
  AndroidNativeProps,
  DateTimePickerAndroid,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';

export function DatePickerIos({
  show,
  ...props
}: IOSNativeProps & { show: boolean }) {
  return show ? <RNDateTimePicker mode="date" {...props} /> : <></>;
}

export function DatePickerAndroid(_: AndroidNativeProps) {
  return <></>;
}

export function useDatePickerAndroid(props: AndroidNativeProps) {
  const showDatePickerAndroid = () => {
    DateTimePickerAndroid.open({
      mode: 'date',
      ...props,
    });
  };

  return showDatePickerAndroid;
}
