// Uses tarkov-tools and graphQL to update our data based on the latest from the game

const graphqlLib = require('graphql-request');
const gql = graphqlLib.gql;
const request = graphqlLib.request;
const fs = require('fs');

const query = gql`
{
  hideoutModules {
    id
    name
    level
    itemRequirements {
      item {
        name
        avg24hPrice
      }
      count
      quantity
    }
  }
}
`
var ourJsonData = require('./loc/en-US.json');

request('https://tarkov-tools.com/graphql', query)
    .then((data) => {
        console.log("Got a response from tarkov-tools!");
        let modules = data['hideoutModules'];
        // hideoutModules: [{}]
        // schema matches query above
        for (const i in modules) {
            let module = modules[i];
            let tarkovToolsItemReqs = module['itemRequirements'];
            if (!tarkovToolsItemReqs) {
                continue;
            }
            let tarkovToolsId = module.id;
            var itemsForJson = []; // this is the output we'll write to json
            for (const i in tarkovToolsItemReqs) {
                let item = tarkovToolsItemReqs[i];
                let name = item['item']['name'];
                let count = item['count'];
                itemsForJson[i] = [count, name];
            }
            let thisModule = ourJsonData.find(element => element['tarkovToolsId'] === tarkovToolsId);
            if (!thisModule) {
                continue;
            }
            thisModule['requirements']['items'] = itemsForJson;
        }
        console.log("Finished updating in-memory -> writing to file.");
        writeItemRequirementsToFile(ourJsonData);
    })


function writeItemRequirementsToFile(jsonToWrite) {
    fs.writeFileSync('loc/en-US.json', JSON.stringify(jsonToWrite), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Finished writing to file.");
    });
}