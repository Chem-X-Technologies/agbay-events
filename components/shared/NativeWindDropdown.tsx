import { cssInterop } from 'nativewind';
import { Dropdown } from 'react-native-element-dropdown';

const NativeWindDropdown = cssInterop(Dropdown, {
  className: {
    target: 'style',
  },
  containerClassName: {
    target: 'containerStyle',
  },
  placeholderClassName: {
    target: 'placeholderStyle',
  },
  selectedTextClassName: {
    target: 'selectedTextStyle',
  },
  iconClassName: {
    target: 'iconStyle',
  },
  itemTextClassName: {
    target: 'itemTextStyle',
  },
  inputSearchClassName: {
    target: 'inputSearchStyle',
  },
  activeColorClassName: {
    target: false,
    nativeStyleToProp: {
      backgroundColor: 'activeColor',
    },
  },
});

export default NativeWindDropdown;
