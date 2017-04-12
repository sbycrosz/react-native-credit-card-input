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

  // In case icon is a component
  return (
    <TouchableOpacity
      onPress={props.onPress}
    >
      {props.icon}
    </TouchableOpacity>
  );
}

export default LiteCreditCardInputCardIcon;
