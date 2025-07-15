import { render, screen } from '@testing-library/react-native';
import React from 'react';
import CreditCardView from '../CreditCardView';

jest.mock('react-native-flip-card', () => {
  const { View } = require('react-native');
  const FlipCard = ({
    children,
    flip,
  }: {
    children: React.ReactNode;
    flip: boolean;
  }) => {
    if (flip && children && Array.isArray(children) && children.length > 1) {
      return <View testID="card-back">{children[1]}</View>;
    }
    if (children && Array.isArray(children) && children.length > 0) {
      return <View testID="card-front">{children[0]}</View>;
    }
    return <View testID="card-front" />;
  };

  return FlipCard;
});

describe('CreditCardView', () => {
  it('renders default placeholder by default', () => {
    render(<CreditCardView />);
    expect(screen.getByText('•••• •••• •••• ••••')).toBeTruthy();
    expect(screen.getByText('••/••')).toBeTruthy();
  });

  it('renders supplied values when provided', () => {
    render(
      <CreditCardView
        name={'John Doe'}
        number={'4111 1111 1111 1111'}
        expiry={'12/25'}
        cvc={'123'}
      />
    );
    expect(screen.getByText('4111 1111 1111 1111')).toBeTruthy();
    expect(screen.getByText('JOHN DOE')).toBeTruthy();
    expect(screen.getByText('12/25')).toBeTruthy();
  });

  describe('Card flipping behavior', () => {
    it('shows front by default', () => {
      render(<CreditCardView />);
      expect(screen.getByTestId('card-front')).toBeTruthy();
      expect(screen.queryByTestId('card-back')).toBeFalsy();
    });

    it('shows back when focusedField is cvc and not American Express', () => {
      render(
        <CreditCardView
          focusedField="cvc"
          type="visa"
        />
      );
      expect(screen.getByTestId('card-back')).toBeTruthy();
      expect(screen.queryByTestId('card-front')).toBeFalsy();
    });

    it('shows front when focusedField is cvc and type is American Express', () => {
      render(
        <CreditCardView
          focusedField="cvc"
          type="american-express"
        />
      );
      expect(screen.getByTestId('card-front')).toBeTruthy();
      expect(screen.queryByTestId('card-back')).toBeFalsy();
    });

    it('displays CVC on back when card is flipped', () => {
      render(
        <CreditCardView
          focusedField="cvc"
          type="visa"
          cvc="123"
        />
      );
      expect(screen.getByText('123')).toBeTruthy();
    });
  });

  describe('American Express specific behavior', () => {
    it('shows CVC on front for American Express cards', () => {
      render(
        <CreditCardView
          type="american-express"
          cvc="123"
        />
      );
      expect(screen.getByText('123')).toBeTruthy();
    });

    it('does not flip card for American Express when CVC is focused', () => {
      render(
        <CreditCardView
          type="american-express"
          focusedField="cvc"
        />
      );
      expect(screen.getByTestId('card-front')).toBeTruthy();
      expect(screen.queryByTestId('card-back')).toBeFalsy();
    });
  });
});
