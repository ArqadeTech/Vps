#!/bin/sh
set -eu
: "${TTYD_USER:?TTYD_USER required}"
: "${TTYD_PASSWORD:?TTYD_PASSWORD required}"
if [ "${#TTYD_PASSWORD}" -lt 12 ]; then echo "TTYD_PASSWORD must be 12+ chars" >&2; exit 1; fi

exec ttyd --writable --port 7681 --credential "${TTYD_USER}:${TTYD_PASSWORD}" \
  tmux new-session -A -s main zsh
