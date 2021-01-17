# Path to this plugin
PROTOC_GEN_TS_PATH="../../node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./proto"

VERSION=`basename $PWD`
echo "VERSION $VERSION"

rm -rf  $OUT_DIR
mkdir $OUT_DIR

protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="${OUT_DIR}" \
    schema.proto

mv proto/schema_pb.js proto/schema_pb.js.bak

sed "s/proto\./proto_$VERSION./g; s/goog.object.extend(exports, proto)/goog.object.extend(exports, proto_$VERSION)/g" proto/schema_pb.js.bak > proto/schema_pb.js