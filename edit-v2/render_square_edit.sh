#!/bin/zsh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/edit-v2/assets"
OUT="$ROOT/edit-v2/output"
FONT="/System/Library/Fonts/Supplemental/Impact.ttf"
mkdir -p "$OUT" "$ASSETS/dribble_frames"

# Square title cards. Every visual source below is video footage, never a photo.
magick -size 720x720 xc:none -font "$FONT" -gravity south -fill white -stroke black -strokewidth 3 -pointsize 58 -annotate +0+65 "LAMINE YAMAL" "$ASSETS/title_yamal.png"
magick -size 720x720 xc:none -font "$FONT" -gravity center -fill white -pointsize 34 -annotate +0-35 "ENTERING THE GROUND" -fill '#f6c945' -stroke black -strokewidth 2 -pointsize 64 -annotate +0+55 "NEYMAR JR" "$ASSETS/title_tts.png"
magick -size 720x720 xc:none -font "$FONT" -gravity center -fill white -stroke black -strokewidth 8 -pointsize 116 -annotate +0-18 "MOGGED" -fill '#e4c83b' -stroke black -strokewidth 3 -pointsize 32 -annotate +0+90 "WASTED." "$ASSETS/title_mogged.png"
magick -size 720x720 xc:none -font "$FONT" -gravity center -fill white -pointsize 40 -annotate +0-150 "ROASTED BY" -fill '#f6c945' -stroke black -strokewidth 3 -pointsize 74 -annotate +0-95 "NEYMAR JR" -fill white -stroke '#7d3cff' -strokewidth 3 -pointsize 82 -annotate +0+35 "EpicGamerzz" -fill white -stroke none -pointsize 34 -annotate +0+130 "COOKED BY" "$ASSETS/title_outro.png"

# Clear microphone-style text-to-speech.
say -v Daniel -r 150 -o "$ASSETS/neymar_entering.aiff" "Neymar Jr entering the ground."
ffmpeg -y -i "$ASSETS/neymar_entering.aiff" -af "highpass=f=300,lowpass=f=4000,aecho=0.8:0.4:55:0.22,volume=2" "$ASSETS/neymar_entering.wav"

# 0–2.4: actual Yamal on-pitch video with white flash in/out.
ffmpeg -y -ss 2 -t 2.4 -i "$ASSETS/yamal_source.webm" -loop 1 -i "$ASSETS/title_yamal.png" \
  -filter_complex "[0:v]scale=720:720:force_original_aspect_ratio=increase,crop=720:720,setsar=1,eq=contrast=1.12:saturation=1.15[v];[v][1:v]overlay=0:0,fade=t=in:st=0:d=0.10:color=white,fade=t=out:st=2.16:d=0.24:color=white" \
  -t 2.4 -c:v libx264 -preset ultrafast -pix_fmt yuv420p -an "$OUT/01_yamal.mp4"

# 2.4–4.6: black TTS entrance announcement.
ffmpeg -y -f lavfi -i "color=c=black:s=720x720:r=30:d=2.2" -loop 1 -i "$ASSETS/title_tts.png" -i "$ASSETS/neymar_entering.wav" \
  -filter_complex "[0:v][1:v]overlay=0:0" -map 0:v -map 2:a -shortest -c:v libx264 -preset ultrafast -pix_fmt yuv420p -c:a aac "$OUT/02_tts.mp4"

# 4.6–7: actual Neymar moving footage.
ffmpeg -y -ss 0 -t 2.4 -i "$ASSETS/neymar_source.webm" \
  -vf "scale=720:720:force_original_aspect_ratio=increase,crop=720:720,setsar=1,eq=contrast=1.18:saturation=1.12" -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p "$OUT/03_neymar.mp4"

# 7–10: real-footage Pancake sequence: fast forward -> slow pivot -> fast reverse, with motion blend.
ffmpeg -y -ss 0.4 -t 1.2 -i "$ASSETS/football_dribble.mp4" \
  -vf "scale=720:720:force_original_aspect_ratio=increase,crop=720:720,setpts=0.45*PTS,tmix=frames=3:weights='1 1 1'" -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p "$OUT/04a_fast.mp4"
ffmpeg -y -ss 1.6 -t 0.45 -i "$ASSETS/football_dribble.mp4" \
  -vf "scale=720:720:force_original_aspect_ratio=increase,crop=720:720,setpts=2.2*PTS" -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p "$OUT/04b_pivot.mp4"
ffmpeg -y -ss 1.6 -t 0.9 -i "$ASSETS/football_dribble.mp4" \
  -vf "scale=720:720:force_original_aspect_ratio=increase,crop=720:720,reverse,setpts=0.42*PTS,tmix=frames=3:weights='1 1 1'" -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p "$OUT/04c_reverse.mp4"
printf "file '%s'\nfile '%s'\nfile '%s'\n" "$OUT/04a_fast.mp4" "$OUT/04b_pivot.mp4" "$OUT/04c_reverse.mp4" > "$OUT/pancake.txt"
ffmpeg -y -f concat -safe 0 -i "$OUT/pancake.txt" -c copy "$OUT/04_pancake.mp4"

# 10–12.2: actual dribble footage extracted into 54 frames and assembled back into a mini-video.
ffmpeg -y -ss 4 -t 2.25 -i "$ASSETS/football_dribble.mp4" \
  -vf "scale=720:720:force_original_aspect_ratio=increase,crop=720:720,fps=24" -frames:v 54 "$ASSETS/dribble_frames/frame_%03d.png"
ffmpeg -y -framerate 24 -i "$ASSETS/dribble_frames/frame_%03d.png" -frames:v 54 -c:v libx264 -preset ultrafast -pix_fmt yuv420p -an "$OUT/05_dribble_frames.mp4"

# 12.2–14.7: moving Yamal footage with a shaken, Wasted-like MOGGED impact card.
ffmpeg -y -ss 43 -t 2.5 -i "$ASSETS/yamal_source.webm" -loop 1 -i "$ASSETS/title_mogged.png" \
  -filter_complex "[0:v]scale=720:720:force_original_aspect_ratio=increase,crop=720:720,setsar=1,eq=contrast=1.3:saturation=0.65[v];[v][1:v]overlay=x='if(gte(t,0.55),sin(t*70)*10,0)':y='if(gte(t,0.55),cos(t*70)*8,0)':enable='between(t,0.55,1.45)'" \
  -t 2.5 -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p "$OUT/06_mogged.mp4"

# 14.7–18: second actual-footage Pancake finish.
ffmpeg -y -ss 6 -t 1.05 -i "$ASSETS/football_dribble.mp4" \
  -vf "scale=720:720:force_original_aspect_ratio=increase,crop=720:720,setpts=0.48*PTS,tmix=frames=3:weights='1 1 1'" -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p "$OUT/07a_fast.mp4"
ffmpeg -y -ss 7.1 -t 0.5 -i "$ASSETS/football_dribble.mp4" \
  -vf "scale=720:720:force_original_aspect_ratio=increase,crop=720:720,setpts=2.0*PTS" -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p "$OUT/07b_pivot.mp4"
ffmpeg -y -ss 7.1 -t 0.9 -i "$ASSETS/football_dribble.mp4" \
  -vf "scale=720:720:force_original_aspect_ratio=increase,crop=720:720,reverse,setpts=0.4*PTS,tmix=frames=3:weights='1 1 1'" -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p "$OUT/07c_reverse.mp4"
printf "file '%s'\nfile '%s'\nfile '%s'\n" "$OUT/07a_fast.mp4" "$OUT/07b_pivot.mp4" "$OUT/07c_reverse.mp4" > "$OUT/pancake_finish.txt"
ffmpeg -y -f concat -safe 0 -i "$OUT/pancake_finish.txt" -c copy "$OUT/07_pancake_finish.mp4"

# Closing card.
ffmpeg -y -loop 1 -framerate 30 -i "$ASSETS/title_outro.png" -f lavfi -i "color=c=black:s=720x720:r=30" \
  -filter_complex "[1:v][0:v]overlay=0:0,fade=t=in:st=0:d=0.25,fade=t=out:st=2.7:d=0.3" -frames:v 90 -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p "$OUT/08_outro.mp4"

ffmpeg -y -i "$OUT/01_yamal.mp4" -i "$OUT/02_tts.mp4" -i "$OUT/03_neymar.mp4" -i "$OUT/04_pancake.mp4" -i "$OUT/05_dribble_frames.mp4" -i "$OUT/06_mogged.mp4" -i "$OUT/07_pancake_finish.mp4" -i "$OUT/08_outro.mp4" \
  -filter_complex "[0:v]setsar=1,setpts=PTS-STARTPTS[v0];[1:v]setsar=1,setpts=PTS-STARTPTS[v1];[2:v]setsar=1,setpts=PTS-STARTPTS[v2];[3:v]setsar=1,setpts=PTS-STARTPTS[v3];[4:v]setsar=1,setpts=PTS-STARTPTS[v4];[5:v]setsar=1,setpts=PTS-STARTPTS[v5];[6:v]setsar=1,setpts=PTS-STARTPTS[v6];[7:v]setsar=1,setpts=PTS-STARTPTS[v7];[v0][v1][v2][v3][v4][v5][v6][v7]concat=n=8:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p "$OUT/visual.mp4"

# Real CC0 Brazilian phonk, ducked below the entrance TTS.
ffmpeg -y -i "$OUT/visual.mp4" -i "$ASSETS/phonk.mp3" -i "$ASSETS/neymar_entering.wav" \
  -filter_complex "[1:a]volume=0.62,atrim=duration=22[a];[2:a]adelay=2400|2400,volume=1.9[b];[a][b]amix=inputs=2:duration=first:normalize=0[m]" \
  -map 0:v -map "[m]" -c:v libx264 -preset ultrafast -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 192k -shortest "$OUT/neymar_yamal_square_rebuild.mp4"
