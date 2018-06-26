
#!/bin/bash
test() {
 echo $1 $2
 node ./index.js $1 $2
}

test $1 $2
#node ./index.js --host-name=a3esojh98xaqm2.iot.us-west-2.amazonaws.com --private-key=1877c4db8c-private.key --client-certificate=1877c4db8c-certificate.cert.pem --ca-certificate=root-CA.crt
