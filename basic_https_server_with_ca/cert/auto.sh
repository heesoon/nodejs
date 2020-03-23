#!/bin/sh

rootca_name="rootca"

echo "root ca certification generation ... "

openssl genrsa -out ${rootca_name}.key 2048

touch ${rootca_name}.srl && echo 00 > ${rootca_name}.srl

echo "success root ca private key"

openssl req -new \
-key rootca.key \
-subj '/C=KR/ST=Seoul/O=LGE/OU=ID/CN=www.lge.com/' \
-out rootca.csr \
-config rootca_openssl.conf

echo "success csr for root ca"

openssl x509 -req \
-days 365 \
-extensions v3_ca \
-set_serial 1 \
-in rootca.csr \
-signkey rootca.key \
-out rootca.crt \
-extfile rootca_openssl.conf

echo "success certification for root CA"

echo "identify ca certification ..... "
openssl x509 -text \
-in rootca.crt

echo "-----------------------------------------------------"
echo " ********** server certification genterate **********"
echo "-----------------------------------------------------"

openssl genrsa -out server.key 2048

echo "success generate server private key"

openssl req -new \
-key server.key \
-subj '/C=KR/ST=Seoul/O=LGE/OU=LGE/CN=lge/' \
-out server.csr \
-config server_openssl.conf \

echo "success generate server csr"

openssl x509 -req -days 365 \
-extensions v3_user \
-in server.csr \
-CA rootca.crt \
-CAkey rootca.key \
-out server.crt \
-extfile server_openssl.conf

echo "success generate server certification"

openssl x509 -text -in server.crt
