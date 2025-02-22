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
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getEventById } from '~/lib/services/eventService';
import LoadingSpinner from '~/components/shared/LoadingSpinner';

export default function EventCard() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isFetching } = useQuery({
    queryKey: [`events/${id}`],
    queryFn: () => getEventById(id),
  });

  if (isFetching) return <LoadingSpinner />;

  return (
    <Card className="w-full p-2 rounded-2xl">
      <CardHeader className="items-center">
        <CardTitle className="text-center">{data?.name}</CardTitle>
        {!!data?.description && (
          <CardDescription className="pt-2 text-base font-semibold">
            {data.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="gap-4">
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Muted>Date</Muted>
            <Large>{formatDate(data?.date ?? '')}</Large>
          </View>
          <View className="flex-1">
            <Muted>Time</Muted>
            <Large>{formatTime(data?.time ?? '')}</Large>
          </View>
        </View>
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Muted>Venue</Muted>
            <Large>{data?.venue}</Large>
          </View>
          <View className="flex-1">
            <Muted>Ticket Price</Muted>
            <Large>{formatPeso(data?.ticketPrice ?? 0)}</Large>
          </View>
        </View>
        <View className="flex-row gap-4 flex-wrap">
          {!!data?.contactPerson && (
            <View className="flex-1">
              <Muted>Contact Person</Muted>
              <Large>{data?.contactPerson ?? '-'}</Large>
            </View>
          )}
          {!!data?.contactNumber && (
            <View className="flex-1">
              <Muted>Contact Number</Muted>
              <Large>{data?.contactNumber ?? '-'}</Large>
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
