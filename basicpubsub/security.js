var events = require('events');
var inherits = require('util').inherits;

var crypto = require('crypto-js');


//var tlsReader = require('../common/lib/tls-reader');
var path = require('path');
var fs = require('fs');

function isUndefined(value) {
   return typeof value === 'undefined' || value === null;
};
//begin module
function makeTwoDigits(n) {
   if (n > 9) {
      return n;
   } else {
      return '0' + n;
   }
}

function getDateTimeString() {
   var d = new Date();

   //
   // The additional ''s are used to force JavaScript to interpret the
   // '+' operator as string concatenation rather than arithmetic.
   //
   return d.getUTCFullYear() + '' +
      makeTwoDigits(d.getUTCMonth() + 1) + '' +
      makeTwoDigits(d.getUTCDate()) + 'T' + '' +
      makeTwoDigits(d.getUTCHours()) + '' +
      makeTwoDigits(d.getUTCMinutes()) + '' +
      makeTwoDigits(d.getUTCSeconds()) + 'Z';
}

function getDateString(dateTimeString) {
   return dateTimeString.substring(0, dateTimeString.indexOf('T'));
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
   var kDate = crypto.HmacSHA256(dateStamp, 'AWS4' + key, {
      asBytes: true
   });
   var kRegion = crypto.HmacSHA256(regionName, kDate, {
      asBytes: true
   });
   var kService = crypto.HmacSHA256(serviceName, kRegion, {
      asBytes: true
   });
   var kSigning = crypto.HmacSHA256('aws4_request', kService, {
      asBytes: true
   });
   return kSigning;
}

function signUrl(method, scheme, hostname, path, queryParams, accessId, secretKey,
   region, serviceName, payload, today, now, debug, awsSTSToken) {

   var signedHeaders = 'host';

   var canonicalHeaders = 'host:' + hostname.toLowerCase() + '\n';

   var canonicalRequest = method + '\n' + // method
      path + '\n' + // path
      queryParams + '\n' + // query params
      canonicalHeaders + // headers
      '\n' + // required
      signedHeaders + '\n' + // signed header list
      crypto.SHA256(payload, {
         asBytes: true
      }); // hash of payload (empty string)

   if (debug === true) {
      console.log('canonical request: ' + canonicalRequest + '\n');
   }

   var hashedCanonicalRequest = crypto.SHA256(canonicalRequest, {
      asBytes: true
   });

   if (debug === true) {
      console.log('hashed canonical request: ' + hashedCanonicalRequest + '\n');
   }

   var stringToSign = 'AWS4-HMAC-SHA256\n' +
      now + '\n' +
      today + '/' + region + '/' + serviceName + '/aws4_request\n' +
      hashedCanonicalRequest;

   if (debug === true) {
      console.log('string to sign: ' + stringToSign + '\n');
   }

   var signingKey = getSignatureKey(secretKey, today, region, serviceName);

   if (debug === true) {
      console.log('signing key: ' + signingKey + '\n');
   }

   var signature = crypto.HmacSHA256(stringToSign, signingKey, {
      asBytes: true
   });

   if (debug === true) {
      console.log('signature: ' + signature + '\n');
   }

   var finalParams = queryParams + '&X-Amz-Signature=' + signature;

   if (!isUndefined(awsSTSToken)) {
      finalParams += '&X-Amz-Security-Token=' + encodeURIComponent(awsSTSToken);
   }

   var url = scheme + hostname + path + '?' + finalParams;

   if (debug === true) {
      console.log('url: ' + url + '\n');
   }

   return url;
}


CanonicalRequest =
  HTTPRequestMethod + '\n' +
  CanonicalURI + '\n' +
  CanonicalQueryString + '\n' +
  CanonicalHeaders + '\n' +
  SignedHeaders + '\n' +
  HexEncode(Hash(RequestPayload))


  HTTPRequestMethod = GET
  CanonicalURI = https://a3esojh98xaqm2.iot.us-west-2.amazonaws.com/things/raspberrypi/shadow
