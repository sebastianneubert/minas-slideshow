#!/bin/bash

# Folder containing images
IMG_DIR="spielplatz/images"

# Output JSON file
OUTPUT="spielplatz/images.json"

# Start JSON object
echo "[" > "$OUTPUT"

first=true
for img in "$IMG_DIR"/*.{jpg,jpeg,png,gif,webp}; do
    [ -e "$img" ] || continue

    filename=$(basename "$img")
    path="$IMG_DIR/$filename"

    if [ "$first" = true ]; then
        first=false
    else
        echo "," >> "$OUTPUT"
    fi

    printf "  { \"path\": \"%s\" }" "$path" >> "$OUTPUT"
done

# End JSON object
echo "" >> "$OUTPUT"
echo "]" >> "$OUTPUT"

echo "JSON file generated at $OUTPUT"