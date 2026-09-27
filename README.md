# MediaDrop — Universal Video & Audio Downloader Website

MediaDrop is a modern, full-stack Next.js web application designed to analyze supported public video URLs (YouTube & Instagram) and process allowed downloads into MP4 video and MP3 audio formats.

---

## Requirements

- **Node.js**: `v20.x` or higher
- **npm** or **pnpm**
- **FFmpeg**: Required for audio encoding and video remuxing/transcoding on system PATH.
- **yt-dlp**: Required for extracting media metadata and downloading public stream data on system PATH.
- **Docker** (optional): For containerized production setup.

---

## Installation

```bash
# Navigate to project directory
cd mediadrop

# Install dependencies
npm install --legacy-peer-deps
```

---

## Development

Run the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing & Quality Assurance

```bash
# Run unit tests (Vitest)
npm test

# Run TypeScript typecheck
npm run typecheck

# Run ESLint check
npm run lint

# Build production bundle
npm run build
```

---

## Production Deployment

To build and start the server natively:

```bash
npm run build
npm start
```

---

## Docker Deployment

To build and run the full stack in an isolated Docker container with preconfigured FFmpeg & yt-dlp dependencies:

```bash
docker compose up --build
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` to `.env.local` to customize settings:

```env
NODE_ENV=development

# File & Download Constraints
MAX_FILE_SIZE_MB=500
MAX_DOWNLOAD_TIME_SECONDS=600

# Rate Limiting (per minute per IP)
RATE_LIMIT_ANALYZE=10
RATE_LIMIT_DOWNLOAD=5

# Temporary Storage TTL
TEMP_FILE_TTL_MINUTES=15

# Custom paths if not on system PATH
FFMPEG_PATH=
YT_DLP_PATH=
```

---

## Architecture Overview

```text
Browser
   |
   v
Next.js Frontend (React + Tailwind CSS + Lucide)
   |
   v
API Routes (/api/analyze, /api/download, /api/status/[jobId])
   |
   +---- URL Validation & Security (SSRF & IP Blocking)
   +---- Platform Detector (YouTube & Instagram Allowlist)
   +---- Metadata Extraction (yt-dlp -J)
   +---- In-Memory Job System & Rate Limiting
   +---- Media Processing (FFmpeg MP3 & MP4 remuxing)
   |
   v
Temporary Storage (/tmp/media-downloads/{jobId}/)
   |
   +---- User File Streaming (/api/download/file/[jobId])
   +---- Automatic TTL Cleanup Job
```

---

## Compliance & Legal Notice

Use this service only for media you have permission to download or otherwise have the legal right to access and use. Respect copyright, creator rights, and the terms of the platform where the media is hosted.

MediaDrop:
1. Does not attempt to bypass DRM or encryption.
2. Does not defeat private account protections, paywalls, or authentication.
3. Automatically purges all temporary files after processing.
