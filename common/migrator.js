import fs from 'fs';
import path from 'path';

export default class Migrator {

  /**
   * Apply migrations to object
   * 
   * @param {Object} targetObject 
   * @param {Array<Object>} migrations
   * @returns {Object} resultingObject
   */
  applyMigrationsToObj(targetObject, migrations) {
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
  applyMigrationsToDirSync(dirPath, fileName, migrations) {
    fs.readdirSync(dirPath).forEach(file => {
      if (file === fileName) {
        let targetFile = fs.readFileSync(path.join(dirPath, file))
        let targetObject = JSON.parse(targetFile)
        let resultingObject = this.applyMigrationsToObj(targetObject, migrations);
        fs.writeFileSync(path.join(dirPath, file), resultingObject);
      }
    });
  }

}
