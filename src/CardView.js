import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

import defaultIcons from "./Icons";
import FlipCard from "react-native-flip-card";

const BASE_SIZE = { width: 300, height: 190 };

const BASE_FONT_SIZE = 21;
const MEDIUM_FONT_SIZE = 16;
const SMALL_FONT_SIZE = 9;

const MEDIUM_FONT_RATIO = (1 / BASE_FONT_SIZE) * MEDIUM_FONT_SIZE;
const SMALL_FONT_RATIO = (1 / BASE_FONT_SIZE) * SMALL_FONT_SIZE;

const s = StyleSheet.create({
  cardContainer: {},
  cardFace: {},
  icon: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  baseText: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
  },
  placeholder: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  focused: {
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 1)",
  },
  number: {
    position: "absolute",
    top: 95,
    left: 28,
  },
  name: {
    position: "absolute",
    bottom: 20,
    left: 25,
    right: 100,
  },
  expiryLabel: {
    position: "absolute",
    bottom: 40,
    left: 218,
  },
  expiry: {
    position: "absolute",
    bottom: 20,
    left: 220,
  },
  amexCVC: {
    position: "absolute",
    top: 73,
    right: 30,
  },
  cvc: {
    position: "absolute",
    top: 80,
    right: 30,
  },
});

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CardView extends Component {
  static propTypes = {
    focused: PropTypes.string,

    brand: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    expiry: PropTypes.string,
    cvc: PropTypes.string,
    placeholder: PropTypes.object,

    scale: PropTypes.number,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    imageFront: PropTypes.number,
    imageBack: PropTypes.number,
    customIcons: PropTypes.object,
  };

  static defaultProps = {
    name: "",
    placeholder: {
      number: "•••• •••• •••• ••••",
      name: "FULL NAME",
      expiry: "••/••",
      expiryLabel: "MONTH/YEAR",
      cvc: "•••",
    },

    scale: 1,
    fontFamily: Platform.select({ ios: "Courier", android: "monospace" }),
    imageFront: require("../images/card-front.png"),
    imageBack: require("../images/card-back.png"),
  };

  hideCVC = cvc => Array.from(cvc).map((/* char */) => "•").join("");

  render() {
    const { focused,
      brand, name, number, expiry, cvc, customIcons, placeholder,
      imageFront, imageBack, scale, fontSize, fontFamily, hideCVC } = this.props;

    const Icons = { ...defaultIcons, ...customIcons };
    const isAmex = brand === "american-express";
    const shouldFlip = !isAmex && focused === "cvc";

    const containerSize = { ...BASE_SIZE, height: BASE_SIZE.height * scale };
    const transform = { transform: [
      { scale },
      { translateY: ((BASE_SIZE.height * (scale - 1) / 2)) },
    ] };

    return (
      <View style={[s.cardContainer, containerSize]}>
        <FlipCard style={{ borderWidth: 0 }}
          flipHorizontal
          flipVertical={false}
          friction={10}
          perspective={2000}
          clickable={false}
          flip={shouldFlip}>
          <ImageBackground style={[BASE_SIZE, s.cardFace, transform]}
            source={imageFront}>
              <Image style={[s.icon]}
                source={Icons[brand]} />
              <Text style={[s.baseText, { fontFamily }, s.number, { fontSize }, !number && s.placeholder, focused === "number" && s.focused]}>
                { !number ? placeholder.number : number }
              </Text>
              <Text
                style={[
                  s.baseText,
                  { fontFamily },
                  s.name,
                  { fontSize: fontSize * MEDIUM_FONT_RATIO },
                  !name && s.placeholder, focused === "name" && s.focused,
                ]}
                numberOfLines={1}>
                { !name ? placeholder.name : name.toUpperCase() }
              </Text>
              <Text
                style={[
                  s.baseText,
                  { fontFamily },
                  s.expiryLabel,
                  { fontSize: fontSize * SMALL_FONT_RATIO },
                  s.placeholder, focused === "expiry" && s.focused,
                ]}>
              {placeholder.expiryLabel}
              </Text>
              <Text
                style={[
                  s.baseText,
                  { fontFamily },
                  s.expiry,
                  { fontSize: fontSize * MEDIUM_FONT_RATIO },
                  !expiry && s.placeholder, focused === "expiry" && s.focused,
                ]}>
                { !expiry ? placeholder.expiry : expiry }
              </Text>
              { isAmex &&
                  <Text
                    style={[
                      s.baseText,
                      { fontFamily },
                      s.amexCVC,
                      { fontSize: fontSize * MEDIUM_FONT_RATIO },
                      !cvc && s.placeholder, focused === "cvc" && s.focused,
                    ]}>
                    { !cvc ? placeholder.cvcAmex : ((hideCVC && this.hideCVC(cvc)) || cvc) }
                  </Text> }
          </ImageBackground>
          <ImageBackground style={[BASE_SIZE, s.cardFace, transform]}
            source={imageBack}>
              <Text style={[s.baseText, s.cvc, { fontSize: fontSize * MEDIUM_FONT_RATIO }, !cvc && s.placeholder, focused === "cvc" && s.focused]}>
                { !cvc ? placeholder.cvc : ((hideCVC && this.hideCVC(cvc)) || cvc) }
              </Text>
          </ImageBackground>
        </FlipCard>
      </View>
    );
  }
}
