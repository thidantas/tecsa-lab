jest.mock('@/ui/components/Icon', () => {
  const { View } = jest.requireActual('react-native');

  return {
    Icon: ({ name }: { name: string }) => <View testID={`icon-${name}`} />,
  };
});

jest.mock('@shopify/flash-list', () => {
  const { FlatList } = jest.requireActual('react-native');

  return { FlashList: FlatList };
});

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));
