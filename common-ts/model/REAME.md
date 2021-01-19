# Notions

1. `obj` or `json` - a human-readable JSON. Includes:
    - `sections.json` files from `composers`dir
    - editor/player internal  state
1. `root` -  a TypeScript type-strict  representation of the object. The goal is
    to migrate editor/player internal state to use  it
2. `binary` - a compressed, base64-ed representation of the root object 

## Conversion

`obj` -> `root` - must be done very carefully (check all corner-cases) because the source  object
is coming from JavaScript without type checking

`root` -> `binary` and `binary`-> `root` conversions are less demanding because the source  object
is coming from TypeSecript with necessary type checking

`root` -> `root` (when  `root` is  passed  as an object) should also work!  (`obj` is a loose
superset  of `root`

# Changelog

v0000 -> v0001:
 - `root.sections[].pages` now stores integers (pageIdx), not pageId
 - `root.sections[].pageAreas` now an array, not an object
 - `root.sections[].pageAreas[]` now contains `pageIdx` (integer) and `areas` (list of areas) 
 - `root.pages` changed to `root.pageUrls`
  
  
v0001 -> v0002:
 - `root.sections[].pages` is renamed to `root.sections[].pageIdxs`
 - added `root.changeCounter`
 - added `root.updatedAt`
 
 
# How to create a new version of the model

1. Create the next `V???` directory
1. Copy the content of the previous directory there; introduce your changes
 - don't forget to update schema.proto and regenerate protobuf boilerplate by runnint
   `protoc.sh`
1. Modify tests; make sure previous version objects can be parsed
1. Follow "Promote change to editor/player" in `../README.md`
