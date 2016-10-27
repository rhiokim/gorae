# Gorae

* Go to the directory where certificates for your Machine are stored. In my case, this is

```
.docker/machine/machines/couchbase directory.
```

* Generate *.p12 format for the certificate:

```
openssl pkcs12 -export \
-inkey key.pem \
-in cert.pem \
-CAfile ca.pem \
-chain \
-name client-side \
-out cert.p12 \
-password pass:mypass
```

```
curl https://192.168.99.100:2376/images/json --cert $DOCKER_CERT_PATH/cert.p12 --pass mypass --key $DOCKER_CERT_PATH/key.pem --cacert $DOCKER_CERT_PATH/ca.pem
```

## How to run after build
```
```

### References
- https://docs.docker.com/engine/reference/api/docker_remote_api/
- http://blog.couchbase.com/2016/february/enabling-docker-remote-api-docker-machine-mac-osx
- https://github.com/apocas/dockerode
- https://github.com/CenturyLinkLabs/golang-builder
- https://forums.docker.com/t/docker-osx-var-run-docker-sock-file-missing/623
