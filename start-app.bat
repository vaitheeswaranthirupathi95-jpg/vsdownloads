@echo off
title VSdownloads Server
echo ===================================================
echo Starting VSdownloads Server...
echo ===================================================
cd /d "%~dp0"

start http://localhost:3000
npm run dev
pause
