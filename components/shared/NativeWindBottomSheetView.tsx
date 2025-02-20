import { BottomSheetView } from '@gorhom/bottom-sheet';
import { cssInterop } from 'nativewind';

const NativeWindBottomSheetView = cssInterop(BottomSheetView, {
  className: {
    target: 'style',
  },
});

export default NativeWindBottomSheetView;
