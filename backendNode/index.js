const {MongoClient} = require('mongodb');

async function main() {
    const client  = new MongoClient('mongodb://0.0.0.0:27017/mytodoapp');
    try {
    await client.connect();
    await listDatabases(client);
    } catch (e) {
        console.error(e);
    }finally {
        await client.close();
    }
    
}
main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 