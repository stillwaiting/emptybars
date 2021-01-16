# Build & package

`npm install`

`npx jst`

`npm pack`

# Troubleshooting

When test throws `Emit skipped for language service`, delete  `lib` directory and try again.

# Promote change to editor/player

1. in `common-ts/package.json`, bump the version;
1. build & package
1. in `editor(/player)/package.json`, bump emptybars-common-ts version
1. in editor/player, execute `yarn`
