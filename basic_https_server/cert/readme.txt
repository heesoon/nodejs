## generating self signed certificate without self signed root CA

1. generate private key
 - openssl genrsa -out key.pem 2048

2. CSR for certificate
 - openssl req -new -sha256 -key key.pem -out cert-csr.pem

3. generate certificate
 - openssl x509 -req -days 365 -in cert-csr.pem -signkey key.pem -out cert.pem

4. check certificate
 - openssl x509 -in cert.pem -text -noout

5. https connection identify or check
 - openssl s_client -connect wikipedia.org:443 | openssl x509 -noout -subject -issuer
