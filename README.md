# Private Kali

Vercel can't run a real Kali machine (serverless: no persistent processes, no root, no WebSockets).
So this repo has two parts:

| Part | Where | What |
|------|-------|------|
| `kali/` | Any Docker host (VPS, Hetzner, DigitalOcean, EC2, ...) | Real `kali-rolling` container with a web terminal (ttyd + tmux), HTTPS via Caddy |
| `api/` + `public/` | **Vercel** | Password-gated launcher. Only signed-in users learn the Kali URL. |

## 1. Deploy Kali (on a Docker host with a DNS name pointing at it)

```bash
cd kali
cat > .env <<ENV
DOMAIN=kali.example.com
TTYD_USER=kali
TTYD_PASSWORD=$(openssl rand -base64 24)
ENV
docker compose up -d --build
```
Optional: `KALI_META=kali-tools-top10` for a smaller image. Home dir persists in a volume.

## 2. Deploy the gateway on Vercel

```bash
npm i -g vercel && vercel --prod
```
Set env vars (Project -> Settings -> Environment Variables), see `.env.example`:
`APP_PASSWORD`, `SESSION_SECRET`, `KALI_URL`.

## Privacy model
- Layer 1: Vercel gateway password (HMAC-signed, HttpOnly, 8h cookie).
- Layer 2: ttyd basic auth on the Kali host, behind TLS.
- For stronger privacy, firewall ports 80/443 to your own IP, or put the host on Tailscale/Cloudflare Access.

Only use Kali tools against systems you own or are authorized to test.
