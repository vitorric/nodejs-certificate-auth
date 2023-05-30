# Generate script because certs expire in 1 year (365 days)

# generate server certificate
openssl req \
	-x509 \
	-newkey rsa:2048 \
	-keyout server/server_key.key \
	-out server/server_cert.crt \
	-nodes \
	-days 365 \
	-subj "//CN=localhost\O=Client"

# generate server-signed (valid) certifcate
openssl req \
	-newkey rsa:2048 \
	-keyout client/client_key.key \
	-out client/client_csr.csr \
	-nodes \
	-days 365 \
	-subj "//CN=d23d0488-2a03-4454-9004-cedfc4220c7d"

# sign with server_cert.pem
openssl x509 \
	-req \
	-in client/client_csr.csr \
	-CA server/server_cert.crt \
	-CAkey server/server_key.key \
	-out client/client_cert.crt \
	-set_serial 01 \
	-days 365