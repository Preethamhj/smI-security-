#!/usr/bin/env bash
set -euo pipefail

# Writable temp directory
mkdir -p "$HOME/tmp"
export TMPDIR="$HOME/tmp"

# Output directory
OUT_DIR="/home/scanner/out"
mkdir -p "$OUT_DIR"

# Use HOST_OUT if provided
if [ -n "${HOST_OUT:-}" ]; then
  OUT_DIR="$HOST_OUT"
  mkdir -p "$OUT_DIR"
fi

# Build output filename
TS=$(date -u +"%Y%m%dT%H%M%SZ")
OUT_FILE="${OUT_DIR}/nikto-$(echo $1 | tr ':/.' '_')-$TS.txt"

# Run Nikto with arguments, save stdout to output file
exec perl /opt/nikto/program/nikto.pl "$@" | tee "$OUT_FILE"
