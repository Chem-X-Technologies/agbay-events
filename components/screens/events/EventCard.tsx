import { View } from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Large, Muted } from '~/components/ui/typography';
import { formatDate, formatPeso, formatTime } from '~/lib/utils';
import AgbayEvent from '~/lib/types/agbay-event';

export default function EventCard({ event }: { event: AgbayEvent }) {
  return (
    <Card className="w-full p-2 rounded-2xl">
      <CardHeader className="items-center">
        <CardTitle className="text-center">{event?.name}</CardTitle>
        {!!event?.description && (
          <CardDescription className="pt-2 text-base font-semibold">
            {event.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="gap-4">
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Muted>Date</Muted>
            <Large>{formatDate(event?.date ?? '')}</Large>
          </View>
          <View className="flex-1">
            <Muted>Time</Muted>
            <Large>{formatTime(event?.time ?? '')}</Large>
          </View>
        </View>
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Muted>Venue</Muted>
            <Large>{event?.venue}</Large>
          </View>
          <View className="flex-1">
            <Muted>Ticket Price</Muted>
            <Large>{formatPeso(event?.ticketPrice ?? 0)}</Large>
          </View>
        </View>
        <View className="flex-row gap-4 flex-wrap">
          {!!event?.contactPerson && (
            <View className="flex-1">
              <Muted>Contact Person</Muted>
              <Large>{event?.contactPerson ?? '-'}</Large>
            </View>
          )}
          {!!event?.contactNumber && (
            <View className="flex-1">
              <Muted>Contact Number</Muted>
              <Large>{event?.contactNumber ?? '-'}</Large>
            </View>
          )}
        </View>
      </CardContent>
      {/*<CardFooter className="flex-col gap-3">
         <View className="flex-row items-center overflow-hidden">
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
          </View> 
        {/* <Progress
            value={progress}
            className="h-2"
            indicatorClassName="bg-sky-600"
          /> 
         <Button
          className="shadow shadow-foreground/5"
          onPress={updateProgressValue}
        >
          <Text>Log Ticket Sale</Text>
        </Button> 
      </CardFooter>*/}
    </Card>
  );
}
