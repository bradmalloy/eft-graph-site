// colors
var colorGold = "#C2B7A3";
var colorBlack = "#0e0e0e";
var colorDarkTan = "#181714";

var infoBox = document.getElementById("node-info");

var checkbox = document.getElementById("shouldShowAllAncestors");
checkbox.addEventListener("change", event => {
  if (event.target.checked) {
    return;
  } else {
    unHoverNodesAndEdges();
    network.redraw();
  }
});

// hover effects
var hoverChosenNode = function(values, id, selected, hovering) {
  var node = network.body.nodes[id];
  console.log(values);
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
  }
];

// create an array with nodes
var nodes = new vis.DataSet(stations_ru_RU);

// ex: Stash 1 -> Stash 2
// ex: Workshop req. for Intel Center
// combined = all edges
var combined = directUpgrades.concat(stationRequirements);

// create an array with edges
var edges = new vis.DataSet(combined);

// create a network
var container = document.getElementById("hideout-network");
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
  var checkbox = document.getElementById("shouldShowAllAncestors");
  return checkbox.checked;
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
  var output = "<div>";
  output += "<h3>Items</h3>";
  if (requirementsObject.items && requirementsObject.items.length > 0) {
    output += "<ul>";
    requirementsObject.items.forEach(itemArray => {
      // itemArray is an array, where the first item is an amount and the 2nd is an item name
      var amount = itemArray[0];
      var item = itemArray[1];
      var wikiFormattedText = item
        .replace(/[0-9,]+/, "")
        .trim()
        .replace(/\W/g, "_"); // remove quantities and use _
      var itemLinkHtml =
        '<a href="https://escapefromtarkov.gamepedia.com/' +
        wikiFormattedText +
        '">' +
        item +
        "</a>";
      output += "<li>" + amount + " " + itemLinkHtml + "</li>";
    });
    output += "</ul>";
  } else {
    output += "<p>No item requirements!</p>";
  }
  output += "<h3>Loyalty</h3>";
  if (requirementsObject.loyalty && requirementsObject.loyalty.length > 0) {
    output += "<ul>";
    requirementsObject.loyalty.forEach(vendorArray => {
      var vendor = vendorArray[0];
      var vendorLevel = vendorArray[1];
      var wikiFormattedText = vendor.trim().split(" ")[0]; // pulls out the "Prapor" in "Prapor LL2"
      var vendorLinkHtml =
        '<a href="https://escapefromtarkov.gamepedia.com/' +
        wikiFormattedText +
        '">' +
        vendor +
        "</a>";
      output += "<li>" + vendorLinkHtml + " " + vendorLevel + "</li>";
    });
    output += "</ul>";
  } else {
    output += "<p>No vendor loyalty requirements!</p>";
  }
  output += "<h3>Skills</h3>";
  if (requirementsObject.skills && requirementsObject.skills.length > 0) {
    output += "<ul>";
    requirementsObject.skills.forEach(skillArray => {
      var skill = skillArray[0];
      var skillLevel = skillArray[1];
      var wikiFormattedText = skill
        .replace(/[0-9,]+/, "")
        .trim()
        .replace(/\W/g, "_"); // Skills should not have spaces
      var skillLinkHtml =
        '<a href="https://escapefromtarkov.gamepedia.com/' +
        wikiFormattedText +
        '">' +
        skill +
        "</a>";
      output += "<li>" + skillLinkHtml + " " + skillLevel + "</li>";
    });
    output += "</ul>";
  } else {
    output += "<p>No skill requirements!</p>";
  }
  return output + "</div>";
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
    var infoBoxHtml = "<h2>" + node.options.title + "</h2>";
    infoBoxHtml += "\n" + formatRequirements(node.options.requirements);
    infoBox.innerHTML = infoBoxHtml;
  }
});

// Since scaling isn't working on Chrome, in place of a fixed size
network.once("beforeDrawing", () => {
  container.style.height = "85vh";
});

// brief animation to show off interactivity
network.once("afterDrawing", function() {
  network.fit({
    animation: {
      duration: 300,
      easingFunction: "linear"
    }
  });
});

// show or hide the roadmap
function toggleRoadmap() {
  var rm = document.getElementById("roadmap");
  console.log(rm.style.display);
  if (!rm.style.display || rm.style.display === "none") {
    rm.style.display = "table";
  } else {
    rm.style.display = "none";
  }
}

function switchToEn() {
  console.log("Switching to English!");
  var newNodes = new vis.DataSet(stations_en_US);
  network.nodes = newNodes;
  network.body.emitter.emit('_dataChanged');
  network.redraw();
}

function switchToRu() {
  console.log("Switching to Russian!");
  var newNodes = new vis.DataSet(stations_ru_RU);
  network.nodes = newNodes;
  network.body.emitter.emit('_dataChanged');
  network.redraw();
}