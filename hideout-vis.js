// movin on up
if (top != self) {
  console.log("It looks like the website you're visiting loading this site in a frame.");
  console.log("Redirecting you to eft-graph.com...");
  top.location.replace(self.location.href);
}

// colors
var colorGold = "#C2B7A3";
var colorBlack = "#0e0e0e";
var colorDarkTan = "#181714";

var totalCostShown = false;
const showCostButtonText = "👀 Show Total Cost";
const hideCostButtonText = "❌ Hide Total Cost";

// Elements to mess with
var infoBoxTitle = document.getElementById("infoBoxTitle");
var infoBoxContent = document.getElementById("infoBoxContent");
var cumulativeCostContent = document.getElementById("cumulativeCostContent");
var ancestorCheckbox = document.getElementById("shouldShowAllAncestors");
var container = document.getElementById("hideout-network");

// Set locale according to browser laguage
var locale = navigator.language;
if (typeof navigator.language == "undefined") {
  locale = navigator.systemLanguage; // Works for IE only
}
// And wiki URL
var wikiBaseUrl = null;
if (locale == 'ru-RU' || locale == 'ru_RU') {
  wikiBaseUrl = "https://escapefromtarkov-ru.gamepedia.com/";
} else {
  wikiBaseUrl = "https://escapefromtarkov.gamepedia.com/";
}
// And initial infoBox content
if (locale == 'ru-RU' || locale == 'ru_RU') {
  infoBoxTitle.innerHTML = "Диаграмма убежища";
  infoBoxContent.innerHTML = "<h3>Диаграмма интерактивна, попробуйте!</h3>";
} else {
  infoBoxTitle.innerHTML = "Hideout Graph";
  infoBoxContent.innerHTML = "<h3>Scroll to zoom, click to activate nodes.</h3>";
}
// Settings checkbox - when toggled, clear and redraw
// prevents the already-selected edges from staying
ancestorCheckbox.addEventListener("change", event => {
  if (event.target.checked) {
    return;
  } else {
    unHoverNodesAndEdges();
    network.redraw();
  }
});

// hover effects
var hoverChosenNode = function(values, id, selected, hovering) {
  values.shadow = true;
  values.shadowColor = "#ff0000";
  values.shadowX = 0;
  values.shadowY = 0;
  values.shadowSize = 20;
};
var hoverChosenEdge = function(values, id, selected, hovering) {
  values.color = "#ff0000";
  values.opacity = 1.0;
  values.dashes = false;
  values.shadowX = 0;
  values.shadowY = 0;
  values.shadow = true;
  values.shadowColor = "#ff0000";
};

// Edges are common to all locales, so we don't need to split them out
var directUpgrades = [
  {
    from: "W1",
    to: "W2",
    arrows: "to"
  },
  {
    from: "W2",
    to: "W3",
    arrows: "to"
  },
  {
    from: "WC1",
    to: "WC2",
    arrows: "to"
  },
  {
    from: "WC2",
    to: "WC3",
    arrows: "to"
  },
  {
    from: "V1",
    to: "V2",
    arrows: "to"
  },
  {
    from: "V2",
    to: "V3",
    arrows: "to"
  },
  {
    from: "Sta1",
    to: "Sta2",
    arrows: "to"
  },
  {
    from: "Sta2",
    to: "Sta3",
    arrows: "to"
  },
  {
    from: "Sta3",
    to: "Sta4",
    arrows: "to"
  },
  {
    from: "Sec1",
    to: "Sec2",
    arrows: "to"
  },
  {
    from: "Sec2",
    to: "Sec3",
    arrows: "to"
  },
  {
    from: "RS1",
    to: "RS2",
    arrows: "to"
  },
  {
    from: "RS2",
    to: "RS3",
    arrows: "to"
  },
  {
    from: "NU1",
    to: "NU2",
    arrows: "to"
  },
  {
    from: "NU2",
    to: "NU3",
    arrows: "to"
  },
  {
    from: "M1",
    to: "M2",
    arrows: "to"
  },
  {
    from: "M2",
    to: "M3",
    arrows: "to"
  },
  {
    from: "L1",
    to: "L2",
    arrows: "to"
  },
  {
    from: "L2",
    to: "L3",
    arrows: "to"
  },
  {
    from: "IC1",
    to: "IC2",
    arrows: "to"
  },
  {
    from: "IC2",
    to: "IC3",
    arrows: "to"
  },
  {
    from: "I1",
    to: "I2",
    arrows: "to"
  },
  {
    from: "I2",
    to: "I3",
    arrows: "to"
  },
  {
    from: "H1",
    to: "H2",
    arrows: "to"
  },
  {
    from: "H2",
    to: "H3",
    arrows: "to"
  },
  {
    from: "G1",
    to: "G2",
    arrows: "to"
  },
  {
    from: "G2",
    to: "G3",
    arrows: "to"
  },
  {
    from: "BF1",
    to: "BF2",
    arrows: "to"
  },
  {
    from: "BF2",
    to: "BF3",
    arrows: "to"
  }
];
var stationRequirements = [
  {
    from: "G3",
    to: "AFU1",
    arrows: "to"
  },
  {
    from: "V3",
    to: "AFU1",
    arrows: "to"
  },
  {
    from: "IC2",
    to: "BF1",
    arrows: "to"
  },
  {
    from: "G3",
    to: "BF2",
    arrows: "to"
  },
  {
    from: "SP1",
    to: "BF3",
    arrows: "to"
  },
  {
    from: "WC3",
    to: "BF3",
    arrows: "to"
  },
  {
    from: "WC3",
    to: "BG1",
    arrows: "to"
  },
  {
    from: "NU3",
    to: "BG1",
    arrows: "to"
  },
  {
    from: "Sec2",
    to: "G2",
    arrows: "to"
  },
  {
    from: "V2",
    to: "G2",
    arrows: "to"
  },
  {
    from: "Sec3",
    to: "G3",
    arrows: "to"
  },
  {
    from: "V3",
    to: "G3",
    arrows: "to"
  },
  {
    from: "W2",
    to: "H3",
    arrows: "to"
  },
  {
    from: "G2",
    to: "H3",
    arrows: "to"
  },
  {
    from: "G1",
    to: "I2",
    arrows: "to"
  },
  {
    from: "G2",
    to: "I3",
    arrows: "to"
  },
  {
    from: "Sec2",
    to: "IC1",
    arrows: "to"
  },
  {
    from: "V2",
    to: "IC1",
    arrows: "to"
  },
  {
    from: "Sec3",
    to: "IC2",
    arrows: "to"
  },
  {
    from: "M3",
    to: "IC2",
    arrows: "to"
  },
  {
    from: "NU3",
    to: "IC2",
    arrows: "to"
  },
  {
    from: "G3",
    to: "IC3",
    arrows: "to"
  },
  {
    from: "WC1",
    to: "L2",
    arrows: "to"
  },
  {
    from: "WC2",
    to: "L3",
    arrows: "to"
  },
  {
    from: "RS3",
    to: "LIB1",
    arrows: "to"
  },
  {
    from: "G1",
    to: "NU1",
    arrows: "to"
  },
  {
    from: "L2",
    to: "NU2",
    arrows: "to"
  },
  {
    from: "G2",
    to: "NU3",
    arrows: "to"
  },
  {
    from: "L3",
    to: "NU3",
    arrows: "to"
  },
  {
    from: "Sta2",
    to: "NU3",
    arrows: "to"
  },
  {
    from: "G2",
    to: "RS2",
    arrows: "to"
  },
  {
    from: "H2",
    to: "RS2",
    arrows: "to"
  },
  {
    from: "H3",
    to: "RS3",
    arrows: "to"
  },
  {
    from: "G3",
    to: "RS3",
    arrows: "to"
  },
  {
    from: "IC2",
    to: "SC1",
    arrows: "to"
  },
  {
    from: "I3",
    to: "Sec3",
    arrows: "to"
  },
  {
    from: "I2",
    to: "SR1",
    arrows: "to"
  },
  {
    from: "G3",
    to: "SP1",
    arrows: "to"
  },
  {
    from: "W3",
    to: "SP1",
    arrows: "to"
  },
  {
    from: "H2",
    to: "Sta2",
    arrows: "to"
  },
  {
    from: "V2",
    to: "Sta3",
    arrows: "to"
  },
  {
    from: "G3",
    to: "Sta4",
    arrows: "to"
  },
  {
    from: "W3",
    to: "Sta4",
    arrows: "to"
  },
  {
    from: "H3",
    to: "Sta4",
    arrows: "to"
  },
  {
    from: "IC3",
    to: "Sta4",
    arrows: "to"
  },
  {
    from: "G2",
    to: "V3",
    arrows: "to"
  },
  {
    from: "W2",
    to: "WC2",
    arrows: "to"
  },
  {
    from: "G3",
    to: "WC3",
    arrows: "to"
  },
  {
    from: "I2",
    to: "W2",
    arrows: "to"
  },
  {
    from: "Sta2",
    to: "W3",
    arrows: "to"
  },
  {
    from: "V2",
    to: "H2",
    arrows: "to"
  },
  {
    from: "G2",
    to: "M3",
    arrows: "to"
  }
];

// create an array with nodes
var nodes = null;
if (locale == "ru-RU" || locale == "ru_RU") {
  nodes = new vis.DataSet(stations_ru_RU);
} else {
  nodes = new vis.DataSet(stations_en_US);
}

// ex: Stash 1 -> Stash 2
// ex: Workshop req. for Intel Center
// combined = all edges
var combined = directUpgrades.concat(stationRequirements);

// create an array with edges
var edges = new vis.DataSet(combined);

// create a network
var data = {
  nodes: nodes,
  edges: edges
};

var options = {
  interaction: {
    hover: true,
    navigationButtons: false,
    keyboard: true
  },
  nodes: {
    borderWidth: 2,
    color: {
      border: colorGold,
      background: colorBlack
    },
    font: { color: "#eeeeee" },
    chosen: { node: hoverChosenNode }
  },
  edges: {
    color: {
      color: colorGold,
      opacity: 0.33
    },
    width: 1,
    chosen: { edge: hoverChosenEdge },
    smooth: { enabled: true }
  },
  manipulation: {
    enabled: false
  },
  layout: {
    hierarchical: {
      sortMethod: "directed",
      shakeTowards: "roots",
      nodeSpacing: 350
    }
  },
  autoResize: true
};

var network = new vis.Network(container, data, options);

function shouldShowAllAncestors() {
  return ancestorCheckbox.checked;
}

// Get all the ancestors of a given Node
// nodeId is a string Id that we set in the loc files, ex: "Sta1" or "RS1"
// Returns a list
function getAllAncestors(rootNodeId, listOfChildren) {
  let rootNode = network.body.nodes[rootNodeId];
  if (!rootNode) {
    return [];
  }
  if (!listOfChildren) {
    listOfChildren = [];
  }
  rootNode.edges.forEach(edge => {
    if (edge.toId == rootNodeId) {
      let child = edge.from;
      if (!child.options.completed) {
        listOfChildren.push(child);
        listOfChildren.push(getAllAncestors(child.id));
      }
    }
  });
  return listOfChildren.flat();
}

// Gets the cost of the node + all its ancestors
function getCumulativeCost(nodeId) {
  let allNodes = getAllAncestors(nodeId);
  let totalRequirements = {
    items: {},
    skills: {},
    loyalty: {}
  }
  allNodes.forEach(node => {
    let reqs = node.options.requirements;
    // Requirements are stored as an array, with the count of things needed 1st, and the item name 2nd
    // ex: [15000, "Rubles"] or [1, "LEDX"]
    if (reqs.items && reqs.items != []) {
      reqs.items.forEach(requirementArray => {
        let numberRequired = requirementArray[0];
        let itemName = requirementArray[1];
        let prevNumRequired = totalRequirements.items[itemName] || 0;
        totalRequirements.items[itemName] = prevNumRequired + numberRequired;
      });
    }
    // Skills are stored as ["Skill name", level]
    if (reqs.skills && reqs.skills != []) {
      reqs.skills.forEach(requirementArray => {
        let skillName = requirementArray[0];
        let levelRequired = requirementArray[1];
        let prevLevelRequired = totalRequirements.skills[skillName] || 0;
        totalRequirements.skills[skillName] = Math.max(levelRequired, prevLevelRequired);
      });
    }
    // Loyalty requirements are stored as ["Trader name", "LLX"]
    // Where X is an integer
    if (reqs.loyalty && reqs.loyalty != []) {
      reqs.loyalty.forEach(requirementArray => {
        let traderName = requirementArray[0];
        let levelRequiredString = requirementArray[1];
        let numLevelRequired = parseInt(levelRequiredString.replace("LL",""));
        let prevLevelRequired = totalRequirements.loyalty[traderName] || 0;
        totalRequirements.loyalty[traderName] = Math.max(numLevelRequired, prevLevelRequired);
      });
    }
  });
  return totalRequirements;
}

function generateTotalCostHtml(totalCostObject) {
  var output = '<div class="cumulativeCostContent">';
  if (Object.entries(totalCostObject.items).length > 0) {
    output += '<h3>Items</h3>';
    for (const [key, value] of Object.entries(totalCostObject.items)) {
      output += key + ': ' + value + '<br/>'
    }
  }
  if (Object.entries(totalCostObject.skills).length > 0) {
    output += '<h3>Skills</h3>';
    for (const [key, value] of Object.entries(totalCostObject.skills)) {
      output += key + ': ' + value + '<br/>'
    }
  }
  if (Object.entries(totalCostObject.loyalty).length > 0) {
    output += '<h3>Loyalty</h3>';
    for (const [key, value] of Object.entries(totalCostObject.loyalty)) {
      output += key + ': ' + value + '<br/>'
    }
  }
  output += '</div>';
  return output;
}

// get all the ancestors of the node (so we can highlight, etc)
function hoverAllAncestors(nodeId) {
  var parent = network.body.nodes[nodeId];
  var parentId = parent.id;
  parent.edges.forEach(edge => {
    if (edge.toId == parentId) {
      // we have the edge and the from node, so highlight them
      var child = edge.from;
      edge.hover = true;
      child.hover = true;
      // do this recursively
      return hoverAllAncestors(child.id);
    }
  });
  return parent;
}

// remove the hover state from everything
function unHoverNodesAndEdges() {
  for (const nodeId in network.body.nodes) {
    network.body.nodes[nodeId].hover = false;
  }
  for (const edgeId in network.body.edges) {
    network.body.edges[edgeId].hover = false;
  }
}

// Format the non-station requirements into HTML
function formatRequirements(requirementsObject) {
  // TODO: clean this the fuck up
  var output = "<div>";
  if (locale == "en-US") {
    output += "<h3>Items</h3>";
  }
  if (locale == "ru-RU") {
    output += "<h3>Предметы</h3>";
  }
  if (requirementsObject.items && requirementsObject.items.length > 0) {
    requirementsObject.items.forEach(itemArray => {
      // itemArray is an array, where the first item is an amount and the 2nd is an item name
      var amount = itemArray[0];
      var item = itemArray[1];
      var wikiFormattedText = item
        .replace(/[0-9,]+/, "")
        .trim()
        .replace(/\s/g, "_"); // remove quantities and use _
      var itemLinkHtml =
        '<a href="' + wikiBaseUrl +
        wikiFormattedText +
        '">' +
        item +
        "</a>";
      output += "<h4>" + amount + " " + itemLinkHtml + "</h4>";
    });
  } else {
    if (locale == "en-US") {
      output += "<h4>No item requirements!</h4>";
    }
    if (locale == "ru-RU") {
      output += "<h4>Нет требований к товару!</h4>";
    }
  }
  output += "<br/>"
  if (locale == "en-US") {
    output += "<h3>Loyalty</h3>";
  }
  if (locale == "ru-RU") {
    output += "<h3>Лояльность</h3>";
  }
  if (requirementsObject.loyalty && requirementsObject.loyalty.length > 0) {
    requirementsObject.loyalty.forEach(vendorArray => {
      var vendor = vendorArray[0];
      var vendorLevel = vendorArray[1];
      var wikiFormattedText = vendor.trim().split(" ")[0]; // pulls out the "Prapor" in "Prapor LL2"
      var vendorLinkHtml =
        '<a href="' + wikiBaseUrl +
        wikiFormattedText +
        '">' +
        vendor +
        "</a>";
      output += "<h4>" + vendorLinkHtml + " " + vendorLevel + "</h4>";
    });
  } else {
    if (locale == "en-US") {
      output += "<h4>No vendor loyalty requirements!</h4>";
    }
    if (locale == "ru-RU") {
      output += "<h4>Нет требований к лояльности продавца!</h4>";
    }
  }
  output += "<br/>"
  if (locale == "en-US") {
    output += "<h3>Skills</h3>";
  }
  if (locale == "ru-RU") {
    output += "<h3>Умения</h3>";
  }
  if (requirementsObject.skills && requirementsObject.skills.length > 0) {
    requirementsObject.skills.forEach(skillArray => {
      var skill = skillArray[0];
      var skillLevel = skillArray[1];
      var wikiFormattedText = skill
        .replace(/[0-9,]+/, "")
        .trim()
        .replace(/\s/g, "_"); // Skills should not have spaces
      var skillLinkHtml =
        '<a href="' + wikiBaseUrl +
        wikiFormattedText +
        '">' +
        skill +
        "</a>";
      output += "<h4>" + skillLinkHtml + " " + skillLevel + "</h4>";
    });
  } else {
    if (locale == "en-US") {
      output += "<h4>No skill requirements!</h4>";
    }
    if (locale == "ru-RU") {
      output += "<h4>Нет требований к навыкам!</h4>";
    }
  }
  return output + "</div>";
}

function handleTotalCostButton(nodeId) {
  let showTotalCostButton = document.getElementById("showTotalCostButton");
  if (!totalCostShown) {
    cumulativeCostContent.innerHTML = generateTotalCostHtml(getCumulativeCost(nodeId));
    showTotalCostButton.text = hideCostButtonText;
    totalCostShown = true;
  } else {
    cumulativeCostContent.innerHTML = "";
    showTotalCostButton.text = showCostButtonText;
    totalCostShown = false;
  }
}

function handleMarkAsDoneButton(nodeId) {
  let nodeToMark = network.body.nodes[nodeId];
  nodeToMark.options.completed = true;
  nodeToMark.options.color.border = "#00cc00";
  nodeToMark.options.color.highlight.border = "#00cc00";
  nodeToMark.options.color.hover.border = "#00cc00";
  nodeToMark.options.color.hover.background = "#00cc00";
  nodeToMark.hover = false;
  nodeToMark.edges.forEach(edge => {
    if (edge.toId == nodeToMark.id) {
      edge.options.color.color = "#00cc00";
      edge.options.color.highlight = "#00cc00";
      edge.options.color.hover = "#00cc00";
      edge.hover = false;
    }
  });
  let ancestors = getAllAncestors(nodeId);
  ancestors.forEach(ancestorNode => {
    handleMarkAsDoneButton(ancestorNode.id);
  })
  infoBoxTitle.innerHTML = '<del>' + nodeToMark.options.title + '</del>';
  console.log("Marked " + nodeToMark.options.title + " as done.");
}

function generateMarkAsBuiltButton(nodeId) {
  return '<div class="eft-button" onClick="handleMarkAsDoneButton(\''+nodeId+'\');">'
  + '<a id="showTotalCostButton">'
  + '✅ Mark As Done'
  + '</a></div>';
}

function generateCumulativeCostsButton(nodeId) {
  return '<div class="eft-button" onClick="handleTotalCostButton(\''+nodeId+'\');">'
    + '<a id="showTotalCostButton">'
    + '👀 Show Total Cost'
    + '</a></div>';
}

// highlight on click
network.on("click", function(params) {
  if (params.nodes && params.nodes.length > 0) {
    var selectedNodeId = params.nodes[0];
    var node = network.body.nodes[selectedNodeId];
    if (shouldShowAllAncestors()) {
      // un-hover all other nodes, or we'll just light everything up
      unHoverNodesAndEdges();
      // highlight all ancestor nodes recursively
      hoverAllAncestors(node.id);
    }
    cumulativeCostContent.innerHTML = "";
    // If it's marked as done, show a strikethrough
    if (node.options.completed) {
      infoBoxTitle.innerHTML = '<del>' + node.options.title + '</del>';
    } else {
      infoBoxTitle.innerHTML = node.options.title;
    }
    infoBoxContent.innerHTML = formatRequirements(node.options.requirements) 
      + generateCumulativeCostsButton(node.id)
      + generateMarkAsBuiltButton(node.id);
  }
});

// Since scaling isn't working on Chrome, in place of a fixed size
network.once("beforeDrawing", () => {
  container.style.height = "85vh";
});

// show or hide the roadmap
function toggleRoadmap() {
  var rm = document.getElementById("roadmap");
  if (!rm.style.display || rm.style.display === "none") {
    rm.style.display = "table";
  } else {
    rm.style.display = "none";
  }
}

function switchToEn() {
  console.log("Switching to English!");
  locale = "en-US";
  wikiBaseUrl = "https://escapefromtarkov.gamepedia.com/";
  var newNodes = new vis.DataSet(stations_en_US);
  var newData = {
    nodes: newNodes,
    edges: edges
  };
  network.setData(newData);
  infoBoxTitle.innerHTML = "Hideout Graph";
  infoBoxContent.innerHTML = "<h3>Scroll to zoom, click to activate nodes.</h3>";
}

function switchToRu() {
  console.log("Switching to Russian!");
  locale = "ru-RU";
  wikiBaseUrl = "https://escapefromtarkov-ru.gamepedia.com/";
  var newNodes = new vis.DataSet(stations_ru_RU);
  var newData = {
    nodes: newNodes,
    edges: edges
  };
  network.setData(newData);
  infoBoxTitle.innerHTML = "Диаграмма убежища";
  infoBoxContent.innerHTML = "<h3>Диаграмма интерактивна, попробуйте!</h3>";
}
