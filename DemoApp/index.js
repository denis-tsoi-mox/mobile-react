/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  NativeEventEmitter
} from 'react-native';
import Button from 'react-native-button';

const { JumioMobileSDKNetverify } = NativeModules;
const { JumioMobileSDKBamCheckout } = NativeModules;
const { JumioMobileSDKDocumentVerification } = NativeModules;

const API_TOKEN = '2e223db9-5a04-477a-a967-42bd52a5770b'
const API_SECRET = '36ZzzQDXQPmuF3RMWd0Bw5duSTtWLWgw'
const DATACENTER = 'us'
const BAM_API_TOKEN = '7a8ae099-9ef8-4c7c-8760-e3ee72b52d11'
const BAM_API_SECRET = '8p4zzh3ppipdaBS3ctaJyjAwL5871Moi'
const BAM_DATACENTER = 'us'
// Netverify

const startNetverify = () => {
  JumioMobileSDKNetverify.initNetverify(API_TOKEN, API_SECRET, DATACENTER, {
    enableVerification: true,
    enableIdentityVerification: true,
    userReference: "1234",
    cameraPosition: 'BACK',
    preselectedCountry: 'SGP',
    documentTypes: ['IDENTITY_CARD'],
  });

  // Android only
  //JumioMobileSDKNetverify.enableEMRTD();

  JumioMobileSDKNetverify.startNetverify();
};

// Document Verification

const startDocumentVerification = () => {
  JumioMobileSDKDocumentVerification.initDocumentVerification(API_TOKEN, API_SECRET, DATACENTER, {
	  type: "BS",
	  userReference: "123456789",
	  country: "USA",
	  customerInternalReference: "123456789",
	  //reportingCriteria: "Criteria",
	  //callbackUrl: "URL",
	  //documentName: "Name",
	  //customDocumentCode: "Custom",
      //cameraPosition: "back",
      //enableExtraction: true
  });
  JumioMobileSDKDocumentVerification.startDocumentVerification();
};

// BAM Checkout

const startBAM = () => {
  JumioMobileSDKBamCheckout.initBAM(BAM_API_TOKEN, BAM_API_SECRET, BAM_DATACENTER, {
	//cardHolderNameRequired: true,
	//sortCodeAndAccountNumberRequired: false,
	//expiryRequired: true,
	//cvvRequired: true,
	//expiryEditable: false,
	//cardHolderNameEditable: false,
	//reportingCriteria: "Criteria",
	//vibrationEffectEnabled: true,
	//enableFlashOnScanStart: false,
	//cardNumberMaskingEnabled: false,
	//offlineToken: "TOKEN",
	//cameraPosition: "back",
	//cardTypes: ["VISA", "MASTER_CARD", "AMERICAN_EXPRESS", "CHINA_UNIONPAY", "DINERS_CLUB", "DISCOVER", "JCB"]
  });
  JumioMobileSDKBamCheckout.startBAM();
};

// Callbacks - (Data is displayed as a warning for demo purposes)
const emitterNetverify = new NativeEventEmitter(JumioMobileSDKNetverify);
emitterNetverify.addListener(
    'EventDocumentData',
	(EventDocumentData) => console.warn("EventDocumentData: " + JSON.stringify(EventDocumentData))
);
emitterNetverify.addListener(
    'EventErrorNetverify',
    (EventErrorNetverify) => console.warn("EventErrorNetverify: " + JSON.stringify(EventErrorNetverify))
);

const emitterDocumentVerification = new NativeEventEmitter(JumioMobileSDKDocumentVerification)
emitterDocumentVerification.addListener(
    'EventDocumentVerification',
    (EventDocumentVerification) => console.warn("EventDocumentVerification: " + JSON.stringify(EventDocumentVerification))
);
emitterDocumentVerification.addListener(
    'EventErrorDocumentVerification',
    (EventErrorDocumentVerification) => console.warn("EventErrorDocumentVerification: " + JSON.stringify(EventErrorDocumentVerification))
);

const emitterBamCheckout = new NativeEventEmitter(JumioMobileSDKBamCheckout)
emitterBamCheckout.addListener(
    'EventCardInformation',
    (EventCardInformation) => console.warn("EventCardInformation: " + JSON.stringify(EventCardInformation))
);
emitterBamCheckout.addListener(
    'EventErrorBam',
    (EventErrorBam) => console.warn("EventErrorBam: " + JSON.stringify(EventErrorBam))
);

export default class DemoApp extends Component {
  render() {
    return (
  	  <View style={styles.container}>
		<Button
			onPress={startNetverify}
			style={styles.buttonStyle}>
			Start Netverify
		</Button>
		<Button
			onPress={startDocumentVerification}
			style={styles.buttonStyle}>
			Start Document Verification
		</Button>
		<Button
			onPress={startBAM}
			style={styles.buttonStyle}>
			Start BAM Checkout
		</Button>
  	  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonStyle: {
	  marginBottom: 20
  }
});

AppRegistry.registerComponent('DemoApp', () => DemoApp);
