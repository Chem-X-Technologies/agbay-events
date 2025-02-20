import BottomSheet from '@gorhom/bottom-sheet';
import { cssInterop } from 'nativewind';

const NativeWindBottomSheet = cssInterop(BottomSheet, {
  handleClassName: {
    target: 'handleStyle',
  },
  handleIndicatorClassName: {
    target: 'handleIndicatorStyle',
  },
  containerClassName: {
    target: 'containerStyle',
  },
  backgroundClassName: {
    target: 'backgroundStyle',
  },
});

export default NativeWindBottomSheet;
