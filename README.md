# Music Downloader by Web Scraping

This is a music downloader application that uses web scraping to download music from Apple Music and Spotify.

## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
* [API Endpoints](#api-endpoints)
* [Request Body](#request-body)

## About the Project

This project uses web scraping to download music from Apple Music and Spotify. It uses the following dependencies:

* Axios for making HTTP requests
* Chromium for browser automation
* Crawlee for web scraping
* Express for building the API
* Playwright for browser automation

## Getting Started

To get started with the project, follow these steps:

```bash
git clone https://github.com/Indal-Singh/music_downloader_by_web_scraping
cd music_downloader_by_web_scraping
npm install
```
## API Endpoints

The application has the following API endpoints:

* `POST /api/applemusicdownloader/song`: Download a song from Apple Music
* `POST /api/spotifymusicdownloader/song`: Download a song from Spotify

## Request Body

The request body should be in the following format:
```json
{
  "url": "https://open.spotify.com/track/56zZ48jdyY2oDXHVnwg5Di?si=d4c88779e7ff4015"
}