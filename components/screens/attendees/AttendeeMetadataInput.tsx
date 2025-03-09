import { Control } from 'react-hook-form';
import { View } from 'react-native';
import { FormField, FormInput } from '~/components/ui/form';
import { AttendeeFormType } from './AttendeeForm';
import { Button } from '~/components/ui/button';
import { X } from '~/lib/icons/X';
import { useState } from 'react';
import { cn } from '~/lib/utils';

export default function AttendeeMetadataInput({
  control,
  index,
  onDelete,
}: {
  control: Control<AttendeeFormType>;
  index: number;
  onDelete: () => void;
}) {
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <FormField
      control={control}
      name={`metadata.${index}`}
      render={({ field: parentField }) => (
        <View
          className={cn(
            'flex-row gap-1 justify-between items-end',
            isDeleted && 'hidden'
          )}
        >
          <FormField
            control={control}
            name={`metadata.${index}.key`}
            render={({ field }) => (
              <FormInput
                placeholder="Label"
                containerClassName="flex-1"
                {...field}
              />
            )}
          />
          <FormField
            control={control}
            name={`metadata.${index}.value`}
            render={({ field }) => (
              <FormInput
                placeholder="Value"
                containerClassName="flex-1"
                {...field}
              />
            )}
          />
          <Button
            variant="outline"
            onPress={() => {
              parentField.onChange({
                key: 'x',
                value: 'x',
                isDeleted: true,
              });
              setIsDeleted(true);
              onDelete();
            }}
          >
            <X size={15} className="text-foreground" />
          </Button>
        </View>
      )}
    />
  );
}
