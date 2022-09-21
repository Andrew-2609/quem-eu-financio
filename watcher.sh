#!/bin/sh
MONITORDIR=".github/workflows"
inotifywait -e access,delete,create,attrib,move --format '%w%f' "${MONITORDIR}" | while read WATCHED
do
        echo "For debug purposes: $WATCHED"
        ./rebuild_app.sh
        ./watcher.sh
done