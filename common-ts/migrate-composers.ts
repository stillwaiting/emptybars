import { rootFromObj, rootToObj }  from  './model/current';
import * as fs from 'fs';
import * as path from 'path';

function migrateDir(dirPath: string) {
    fs.readdirSync(dirPath).forEach(file => {
        if (fs.lstatSync(dirPath + "/" + file).isDirectory()) {
            return migrateDir(dirPath + "/" + file);
        }
        if (file === 'sections.json') {
            console.log(`Migrating ${dirPath}/${file}`)
            let content = fs.readFileSync(path.join(dirPath, file));
            let obj = JSON.parse(content.toString());
            const root = rootFromObj(obj);
            fs.writeFileSync(path.join(dirPath, file), JSON.stringify(rootToObj(root), null, 3));
            console.log('.. migrated');
        }
    });
}

migrateDir("../composers");