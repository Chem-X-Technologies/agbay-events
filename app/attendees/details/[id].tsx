import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import QRCode from 'react-qr-code';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getAttendeeById } from '~/lib/services/attendeeService';
import { getEventById } from '~/lib/services/eventService';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import TicketCard from '~/components/screens/attendees/TicketCard';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import AttendeeOptions from '~/components/screens/attendees/AttendeeOptions';
import { Card } from '~/components/ui/card';
import DeleteAttendeeConfirmationDialog from '~/components/screens/attendees/DeleteAttendeeConfirmationDialog';

const fetchData = async (attendeeId: string) => {
  const attendee = await getAttendeeById(attendeeId);
  const event = await getEventById(attendee?.eventId ?? '');
  return { attendee, event };
};

export default function AttendeeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { data, isFetching } = useQuery({
    queryKey: [`attendees/${id}`],
    queryFn: () => fetchData(id),
  });
  const imageRef = useRef<ViewShot>(null);
  const url = Linking.createURL(`/attendees/validate/${id}`);
  const [loading, setLoading] = useState(false);

  const handleShareImage = () => {
    Sharing.isAvailableAsync().then((available) => {
      if (!available) {
        return;
      }

      if (!imageRef.current) return;

      setLoading(true);
      (imageRef.current.capture
        ? imageRef.current.capture()
        : Promise.resolve('')
      ).then((uri) => {
        setLoading(false);
        Sharing.shareAsync(uri).finally(() => {});
      });
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AttendeeOptions onShare={handleShareImage} />,
    });
  }, [navigation]);

  if (isFetching) return <LoadingSpinner />;

  if (!data) return <></>;

  const { attendee, event } = data;

  return (
    <>
      {loading && <LoadingSpinner />}
      <ViewShot
        ref={imageRef}
        style={{ flex: 1 }}
        onCaptureFailure={(error) => console.error('onCaptureFailure', error)}
      >
        <View className="flex-1 items-center justify-around bg-secondary px-4">
          <Card className="bg-white p-6 rounded-2xl">
            <QRCode value={url} />
          </Card>
          <TicketCard event={event} attendee={attendee} />
        </View>
        <DeleteAttendeeConfirmationDialog />
      </ViewShot>
    </>
  );
}
