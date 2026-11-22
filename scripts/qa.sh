#!/bin/bash
# Start a throwaway dev server on :3100 with a bounded heap, screenshot, then stop it.
set -u
cd /home/user/tripnest
PORT=3100
NODE_OPTIONS="--max-old-space-size=700" nohup npx next dev -H 0.0.0.0 -p $PORT > /tmp/qa-server.log 2>&1 &
SERVER_PID=$!
trap 'kill -9 $SERVER_PID 2>/dev/null; pkill -9 -f "next-server" 2>/dev/null' EXIT
for i in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://127.0.0.1:$PORT/ 2>/dev/null)
  if [ "$code" = "200" ]; then break; fi
  sleep 1
done
node scripts/shots.js "$1" "$2" "${3:-1280}" "${4:-800}" "${5:-1}"
