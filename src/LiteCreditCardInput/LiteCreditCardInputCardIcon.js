import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

function LiteCreditCardInputCardIcon(props) {
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
