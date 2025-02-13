import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Large, Muted } from '~/components/ui/typography';
import { MOCK_EVENTS } from '~/lib/constants';
import { formatDate, formatPeso, formatTime } from '~/lib/utils';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const event = MOCK_EVENTS.find((event) => event.id === id);

  return (
    <View className="flex-1 justify-center items-center bg-secondary/30">
      <Card className="w-full p-2 max-w-sm rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="text-center">{event?.name}</CardTitle>
          {!!event?.description && (
            <CardDescription className="pt-2 text-base font-semibold">
              {event.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="gap-6">
          <View className="flex-row justify-between gap-4 flex-wrap">
            <View>
              <Muted>Date</Muted>
              <Large>{formatDate(event?.date ?? '')}</Large>
            </View>
            <View>
              <Muted>Time</Muted>
              <Large>{formatTime(event?.time ?? '')}</Large>
            </View>
            <View>
              <Muted>Venue</Muted>
              <Large>{event?.venue}</Large>
            </View>
            <View>
              <Muted>Ticket Price</Muted>
              <Large>{formatPeso(event?.ticketPrice ?? 0)}</Large>
            </View>
            {!!event?.contactPerson && (
              <View className="">
                <Muted>Contact Person</Muted>
                <Large>{event?.contactPerson ?? '-'}</Large>
              </View>
            )}
            {!!event?.contactNumber && (
              <View>
                <Muted>Contact Number</Muted>
                <Large>{event?.contactNumber ?? '-'}</Large>
              </View>
            )}
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          {/* <View className="flex-row items-center overflow-hidden">
            <Text className="text-sm text-muted-foreground">Productivity:</Text>
            <LayoutAnimationConfig skipEntering>
              <Animated.View
                key={progress}
                entering={FadeInUp}
                exiting={FadeOutDown}
                className="w-11 items-center"
              >
                <Text className="text-sm font-bold text-sky-600">
                  {progress}%
                </Text>
              </Animated.View>
            </LayoutAnimationConfig>
          </View> */}
          {/* <Progress
            value={progress}
            className="h-2"
            indicatorClassName="bg-sky-600"
          /> */}
          <Button
            // variant="outline"
            className="shadow shadow-foreground/5"
            // onPress={updateProgressValue}
          >
            <Text>Register Attendee</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
