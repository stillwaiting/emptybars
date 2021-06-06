if ( curl -o/dev/null -sfI "http://localhost:8062/index.html" ); then
  echo "Local player found!"
  export EMPTYBARS_PLAYER_URL="http://localhost:8062/index.html"
else
  echo "WARN: local player was not found! If you wish to run with local player, goto 'player' dir and run './build.sh ; serve-build.sh'"
fi

if ( curl -o/dev/null -sfI "http://localhost:8061/index.html" ); then
  echo "Local editor found!"
  export EMPTYBARS_EDITOR_URL="http://localhost:8061/index.html"
else
  echo "WARN: local editor was not found! If you wish to run with local editor, goto 'editor' dir and run './build.sh ; serve-build.sh'"
fi

rm -rf .cache

env | grep EMPTYBARS
yarn develop
