import { Dispatch, SetStateAction, useState } from 'react';
import { View } from 'react-native';
import { Combobox } from '~/components/ui/combobox';
import { Input } from '~/components/ui/input';
import { ATTENDEE_STATUS_LIST } from '~/lib/constants';
import Attendee from '~/lib/types/attendee';

export default function AttendeesFilter({
  data,
  setAttendees,
}: {
  data: Attendee[];
  setAttendees: Dispatch<SetStateAction<Attendee[]>>;
}) {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchedName, setSearchedName] = useState('');

  const handleNameSearch = (name: string) => {
    setSearchedName(name);
    filterAttendees(name, selectedStatus);
  };

  const handleStatusSelect = (status: { label: string; value: string }) => {
    setSelectedStatus(status.value);
    filterAttendees(searchedName, status.value);
  };

  const filterAttendees = (name: string, status: string) => {
    const filteredAttendees = data.filter(
      (attendee) =>
        attendee.name.toLowerCase().includes(name.toLowerCase()) &&
        (status === 'All' || attendee.status === status)
    );
    setAttendees(filteredAttendees);
  };

  return (
    <View className="p-2 flex-row items-center justify-between gap-2">
      <Input
        className="flex-1"
        placeholder="Search name"
        onChangeText={handleNameSearch}
      />
      <Combobox
        className="flex-1"
        data={[{ label: 'All', value: 'All' }, ...ATTENDEE_STATUS_LIST]}
        labelField="label"
        valueField="value"
        onChange={handleStatusSelect}
        value={selectedStatus}
      />
    </View>
  );
}
