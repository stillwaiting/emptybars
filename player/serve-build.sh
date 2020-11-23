if ! command -v http-server &> /dev/null
then
    echo "No http-server executable found. Please install it: https://www.npmjs.com/package/http-server"
    exit
fi

cd build ; pwd;  http-server -p 8062