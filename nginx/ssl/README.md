# SSL Certificates

This directory should contain your SSL certificates for HTTPS.

## For Development

Generate self-signed certificates:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem \
  -subj "/C=CH/ST=Geneva/L=Geneva/O=ROMUO VTC/CN=localhost"
```

## For Production

### Option 1: Let's Encrypt (Recommended)

Use Certbot with Docker:

```bash
# Run certbot container
docker run -it --rm \
  -v ./nginx/ssl:/etc/letsencrypt \
  -p 80:80 \
  certbot/certbot certonly --standalone \
  -d yourdomain.com \
  -d www.yourdomain.com

# Copy certificates
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/cert.pem
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/key.pem
```

### Option 2: Manual Certificate

Place your certificate files in this directory:
- `cert.pem` - Your SSL certificate (or fullchain.pem)
- `key.pem` - Your private key

## Files to Create

```
nginx/ssl/
├── cert.pem        # SSL certificate
├── key.pem         # Private key
└── README.md       # This file
```

## Security

**IMPORTANT**: Never commit actual certificate files to Git!

The `.gitignore` should exclude:
```
nginx/ssl/*.pem
nginx/ssl/*.key
nginx/ssl/*.crt
```
