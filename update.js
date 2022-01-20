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

request('https://tarkov-tools.com/graphql', query)
    .then((data) => {
        console.log("Got a response from tarkov-tools!")
        // hideoutModules: [{}]
        // schema matches query above
    })
writeItemRequirementsToFile();

function writeItemRequirementsToFile() {
    fs.writeFileSync('test.txt', "testing file writing and commit in gh actions", err => {
        if (err) {
            console.error(err);
            return;
        }
    });
}