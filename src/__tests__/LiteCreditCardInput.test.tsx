import {
  render,
  screen,
  userEvent,
  within,
} from '@testing-library/react-native';
import LiteCreditCardInput from '../LiteCreditCardInput';

describe('LiteCreditCardInput', () => {
  let onChange: ReturnType<typeof jest.fn>;
  let user: ReturnType<typeof userEvent.setup>;
  let cardInput: ReturnType<typeof within>;

  beforeEach(() => {
    onChange = jest.fn();

    user = userEvent.setup();
    render(
      <LiteCreditCardInput
        onChange={onChange}
        testID="CARD_INPUT"
      />
    );

    cardInput = within(screen.getByTestId('CARD_INPUT'));
  });

  it('should validate and format valid credit-card information', async () => {
    await user.type(cardInput.getByTestId('CC_NUMBER'), '4242424242424242');
    await user.type(cardInput.getByTestId('CC_EXPIRY'), '233');
    await user.type(cardInput.getByTestId('CC_CVC'), '333');

    expect(onChange).toHaveBeenLastCalledWith({
      valid: true,
      status: {
        number: 'valid',
        expiry: 'valid',
        cvc: 'valid',
      },
      values: {
        number: '4242 4242 4242 4242',
        expiry: '02/33',
        cvc: '333',
        type: 'visa',
      },
    });
  });

  it('should ignores non number characters ', async () => {
    await user.type(
      cardInput.getByTestId('CC_NUMBER'),
      '--drop db "users" 4242-4242-4242-4242'
    );
    await user.type(cardInput.getByTestId('CC_EXPIRY'), '#$!@#!@# 12/33');
    await user.type(cardInput.getByTestId('CC_CVC'), 'lorem ipsum 333');

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        values: expect.objectContaining({
          number: '4242 4242 4242 4242',
          expiry: '12/33',
          cvc: '333',
        }),
      })
    );
  });

  it('should return validation error for invalid card information', async () => {
    await user.type(cardInput.getByTestId('CC_NUMBER'), '5555 5555 5555 4443');
    await user.type(cardInput.getByTestId('CC_EXPIRY'), '02 / 99');
    await user.type(cardInput.getByTestId('CC_CVC'), '33');

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        status: {
          number: 'invalid', // failed crc
          expiry: 'invalid', // too far in the future
          cvc: 'incomplete', // cvv is too short
        },
      })
    );
  });

  it('should return credit card issuer based on card number', async () => {
    const numberField = cardInput.getByTestId('CC_NUMBER');

    await user.clear(numberField);
    await user.type(numberField, '4242424242424242');
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        values: expect.objectContaining({ type: 'visa' }),
      })
    );

    await user.clear(numberField);
    await user.type(numberField, '5555555555554444');
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        values: expect.objectContaining({ type: 'mastercard' }),
      })
    );

    await user.clear(numberField);
    await user.type(numberField, '371449635398431');
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        values: expect.objectContaining({ type: 'american-express' }),
      })
    );

    await user.clear(numberField);
    await user.type(numberField, '6011111111111117');
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        values: expect.objectContaining({ type: 'discover' }),
      })
    );

    await user.clear(numberField);
    await user.type(numberField, '3056930009020004');
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        values: expect.objectContaining({ type: 'diners-club' }),
      })
    );

    await user.clear(numberField);
    await user.type(numberField, '3566002020360505');
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        values: expect.objectContaining({ type: 'jcb' }),
      })
    );
  });
});
