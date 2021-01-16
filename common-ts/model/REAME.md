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
superset  of `root`) 