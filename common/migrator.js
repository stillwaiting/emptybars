import fs from 'fs';
import path from 'path';

import m1 from './sections-migrations/m0001.js'

//
// Add more migrations here!
//
const ALL_MIGRATIONS  = [m1]

//
//
//

export default class Migrator {
  /**
   * Apply migrations to object
   * 
   * @param {Object} targetObject 
   * @param {Array<Object>} migrations
   * @returns {Object} resultingObject
   */
  _applyMigrationsToObj(targetObject, migrations) {
    if (! targetObject.hasOwnProperty('version')) targetObject.version = 0;

    for (let migration of migrations) {
      // Only migrate if targetObject.version is lower than migration.version
      if (targetObject.version < migration.version) {
        targetObject = migration.migrate(targetObject);
        targetObject.version = migration.version;
      }
    }

    return targetObject;
  }

  /**
   * Scan all files in dirPath to apply migrations and overwrite the files
   * 
   * @param {String} dirPath 
   * @param {String} fileName 
   * @param {Array<Migration>} migrations
   */
  _applyMigrationsToDirSync(dirPath, fileName, migrations) {
    fs.readdirSync(dirPath).forEach(file => {
      if (fs.lstatSync(dirPath + "/" + file).isDirectory()) {
        return this._applyMigrationsToDirSync(dirPath + "/" + file, fileName, migrations);
      }
      if (file === fileName) {
        console.log(`Migrating ${dirPath}/${file}`)
        let targetFile = fs.readFileSync(path.join(dirPath, file));
        let targetObject = JSON.parse(targetFile);
        let resultingObject = this._applyMigrationsToObj(targetObject, migrations);
        fs.writeFileSync(path.join(dirPath, file), JSON.stringify(resultingObject, null, 2));
      }
    });
  }

  applyAllMigrationsToComposers() {
    return this._applyMigrationsToDirSync('../composers', 'sections.json', ALL_MIGRATIONS)
  }

  applyAllMigrationsToObject(targetObj) {
    return this._applyMigrationsToObj(targetObj, ALL_MIGRATIONS)
  }

  getLastVersion() {
    return ALL_MIGRATIONS[ALL_MIGRATIONS.length - 1].version;
  }
}
