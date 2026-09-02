import { fireEvent, screen } from '@testing-library/react-native';

import { renderComponent } from '@/test-utils/renderComponent';

import { BrandSwitch } from '../BrandSwitch';

describe('<BrandSwitch />', () => {
  it('should select nexo when the nutritionist taps the other brand', () => {
    renderComponent(<BrandSwitch />);

    fireEvent.press(screen.getByLabelText('nexo'));

    expect(screen.getByLabelText('nexo')).toHaveProp('accessibilityState', {
      selected: true,
    });
    expect(screen.getByLabelText('vita')).toHaveProp('accessibilityState', {
      selected: false,
    });
  });
});
