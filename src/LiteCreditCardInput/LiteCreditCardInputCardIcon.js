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

  // In case an image was provided
  if (props.icon && typeof props.icon.uri === 'string') {
    return (
      <Image
        style={props.iconStyle}
        source={props.icon}
      />
    );
  }

  // In case icon is a component
  return props.icon;
}

export default LiteCreditCardInputCardIcon;
