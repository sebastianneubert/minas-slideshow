#!/bin/bash

# Minimum size threshold (1.5MB = 1500k)
THRESHOLD=1500k

# Directory to process
TARGET_DIR="${1:-.}"

# Check if target exists
if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Directory '$TARGET_DIR' does not exist."
  exit 1
fi

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null || ! command -v identify &> /dev/null; then
  echo "ImageMagick is required but not installed."
  echo "Install it with: brew install imagemagick"
  exit 1
fi

# Function to get file size in KB
get_size_kb() {
  stat -f%z "$1" 2>/dev/null | awk '{printf "%.1f KB", $1/1024}'
}

# Function to get image dimensions
get_dims() {
  identify -format "%wx%h" "$1" 2>/dev/null
}

# Process images
find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -size +$THRESHOLD | while read -r img; do
  echo "Processing: $img"

  # Backup before touching file
  if [ ! -f "${img}.backup" ]; then
    cp "$img" "${img}.backup"
    echo "Backup created: ${img}.backup"
  else
    echo "Backup already exists for $img, skipping backup."
  fi

  # Gather before stats
  before_size=$(get_size_kb "$img")
  before_dims=$(get_dims "$img")

  # Optimize in place
  magick "$img" -resize "1920x1920>" -strip -interlace Plane -quality 85% "$img"

  # Gather after stats
  after_size=$(get_size_kb "$img")
  after_dims=$(get_dims "$img")

  # Print diff
  echo "🔎 Before: $before_size, $before_dims"
  echo "✅ After:  $after_size, $after_dims"
  echo "----------------------------------"
done
