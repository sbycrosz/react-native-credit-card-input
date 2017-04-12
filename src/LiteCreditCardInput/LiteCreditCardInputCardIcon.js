import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

/**
 * <LiteCreditCardInputCardIcon />
 * @param props
 * @returns {*}
 * @constructor
 */
function LiteCreditCardInputCardIcon(props) {
  if (!props.icon) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
    >
      <Image
        style={props.iconStyle}
        source={props.icon}
      />
    </TouchableOpacity>
  );
}

export default LiteCreditCardInputCardIcon;
