#!/usr/bin/env bash
# Convierte el video del camión en secuencias de frames WebP para el scroll de la sección Flotilla.
# Uso: bash scripts/build-sequence.sh ruta/al/video.mp4 [frames]
set -euo pipefail
SRC="$1"; N="${2:-96}"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")
FPS=$(python -c "print($N/$DUR)")
for size in "fleet:1280" "fleet-sm:900"; do
  dir="${size%%:*}"; w="${size##*:}"
  rm -rf "public/seq/$dir"; mkdir -p "public/seq/$dir"
  ffmpeg -v error -i "$SRC" -vf "fps=$FPS,scale=$w:-2:flags=lanczos" -frames:v "$N" -c:v libwebp -quality 78 -start_number 0 "public/seq/$dir/f_%03d.webp"
  echo "$dir: $(ls public/seq/$dir | wc -l) frames, $(du -sh public/seq/$dir | cut -f1)"
done
