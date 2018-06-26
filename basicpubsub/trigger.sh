node node_modules/aws-iot-device-sdk/examples/device-example.js --host-name=a3esojh98xaqm2.iot.us-west-2.amazonaws.com --private-key=1877c4db8c-private.key --client-certificate=1877c4db8c-certificate.cert.pem --ca-certificate=root-CA.crt

node node_modules/aws-iot-device-sdk/examples/echo-example.js --host-name=a3esojh98xaqm2.iot.us-west-2.amazonaws.com --private-key=1877c4db8c-private.key --client-certificate=1877c4db8c-certificate.cert.pem --ca-certificate=root-CA.crt


# thing shadow
#
# a3esojh98xaqm2.iot.us-west-2.amazonaws.com/things/raspberrypi/shadow/update
# GET https://iam.amazonaws.com/?Action=ListUsers&Version=2010-05-08 HTTP/1.1
Authorization: AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/iam/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=5d672d79c15b13162d9279b0855cfba6789a8edb4c82c400e06b5924a6f2b5d7
content-type: application/x-www-form-urlencoded; charset=utf-8
host: iam.amazonaws.com
x-amz-date: 20150830T123600Z

stringToSign=AWS4-HMAC-SHA256\n+20180530T014448Z\n
