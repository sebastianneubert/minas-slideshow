#!/bin/bash
# Optimize images without changing EXIF orientation
# - Only downscale
# - Keep metadata (including orientation)
# - Backup originals

set -euo pipefail

MAX_DIM="1920x1920>"
TARGET_DIR="${1:-.}"

# Tool check
if ! command -v magick >/dev/null 2>&1 || ! command -v identify >/dev/null 2>&1; then
  echo "ImageMagick is required but not installed."
  echo "Install it with: brew install imagemagick"
  exit 1
fi

get_size_kb() { stat -f%z "$1" 2>/dev/null | awk '{printf "%.1f KB", $1/1024}'; }
get_dims()    { identify -format "%wx%h" "$1" 2>/dev/null; }
get_orient()  { identify -format "%[EXIF:Orientation]" "$1" 2>/dev/null; }

export IFS=$'\n'
find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r img; do
  echo "Processing: $img"

  # Backup once
  if [ ! -f "${img}.backup" ]; then
    cp "$img" "${img}.backup"
    echo "Backup created: ${img}.backup"
  else
    echo "Backup already exists, skipping backup."
  fi

  before_size=$(get_size_kb "$img")
  before_dims=$(get_dims "$img")
  before_orient=$(get_orient "$img")
  [ -z "$before_orient" ] && before_orient="(none)"

  # Optimize: only downscale, keep metadata, no rotation
  magick "$img" \
    -resize "$MAX_DIM" \
    -interlace Plane \
    -quality 85% \
    "$img"

  after_size=$(get_size_kb "$img")
  after_dims=$(get_dims "$img")
  after_orient=$(get_orient "$img")
  [ -z "$after_orient" ] && after_orient="(none)"

  echo "🔎 Before: $before_size, $before_dims, EXIF Orientation: $before_orient"
  echo "✅ After:  $after_size,  $after_dims,  EXIF Orientation: $after_orient"
  echo "----------------------------------"
done
