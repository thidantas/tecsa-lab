import { fireEvent, screen } from '@testing-library/react-native';

import { renderComponent } from '@/test-utils/renderComponent';

import { SearchField } from '../SearchField';

describe('<SearchField />', () => {
  it('should report what the nutritionist types', () => {
    const onChangeText = jest.fn();

    renderComponent(
      <SearchField value="" onChangeText={onChangeText} placeholder="Buscar" />,
    );

    expect(screen.getByTestId('search-input')).toBeOnTheScreen();
    expect(screen.getByTestId('icon-search')).toBeOnTheScreen();

    fireEvent.changeText(screen.getByTestId('search-input'), 'Ana');

    expect(onChangeText).toHaveBeenCalledWith('Ana');
  });

  it('should keep the current value visible', () => {
    renderComponent(
      <SearchField value="Bruno" onChangeText={jest.fn()} placeholder="Buscar" />,
    );

    expect(screen.getByDisplayValue('Bruno')).toBeOnTheScreen();
  });
});
