import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AttendeeCard from '~/components/screens/attendees/AttendeeCard';
import NativeWindBottomSheet from '~/components/shared/NativeWindBottomSheet';
import NativeWindBottomSheetView from '~/components/shared/NativeWindBottomSheetView';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import * as Linking from 'expo-linking';
import QRCode from 'react-qr-code';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getAttendeeById } from '~/lib/services/attendeeService';
import { getEventById } from '~/lib/services/eventService';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import TicketCard from '~/components/screens/attendees/TicketCard';

const fetchData = async (attendeeId: string) => {
  const attendee = await getAttendeeById(attendeeId);
  const event = await getEventById(attendee?.eventId ?? '');
  return { attendee, event };
};

export default function AttendeeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data, isFetching } = useQuery({
    queryKey: [`attendees/${id}`],
    queryFn: () => fetchData(id as string),
  });

  const handleViewQRCode = () => {
    bottomSheetRef.current?.expand();
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  if (isFetching) return <LoadingSpinner />;

  if (!data) return <></>;

  const { attendee, event } = data;

  const url = Linking.createURL('/old-index');

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 p-4 items-center bg-secondary gap-4">
        <AttendeeCard event={event} attendee={attendee} />
        <Button onPress={handleViewQRCode}>
          <Text>View QR Code</Text>
        </Button>
      </View>
      <NativeWindBottomSheet
        snapPoints={[30, '100%']}
        ref={bottomSheetRef}
        backgroundClassName="bg-secondary"
        handleClassName="bg-secondary"
        handleIndicatorClassName="bg-foreground"
      >
        <NativeWindBottomSheetView className="bg-secondary flex-1 p-4 items-center justify-around">
          <View className="bg-white p-5 rounded-2xl">
            <QRCode value={url} />
          </View>
          <TicketCard event={event} attendee={attendee} />
        </NativeWindBottomSheetView>
      </NativeWindBottomSheet>
    </GestureHandlerRootView>
  );
}
