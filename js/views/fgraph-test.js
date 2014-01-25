var graph1 = {
  "nodes":[
    {"name":"Myriel","group":1},
    {"name":"Napoleon","group":1},
    {"name":"Mlle.Baptistine","group":1},
    {"name":"Mme.Magloire","group":1},
    {"name":"CountessdeLo","group":1},
    {"name":"Geborand","group":1},
    {"name":"Champtercier","group":1},
    {"name":"Cravatte","group":1},
    {"name":"Count","group":1},
    {"name":"OldMan","group":1},
    {"name":"Labarre","group":2},
    {"name":"Valjean","group":2},
    {"name":"Marguerite","group":3},
    {"name":"Mme.deR","group":2},
    {"name":"Isabeau","group":2},
    {"name":"Mme.Hucheloup","group":8}
  ],
  "edges":[
    {"source":1,"target":0,"data":1},
    {"source":2,"target":0,"data":8},
    {"source":3,"target":0,"data":10},
    {"source":3,"target":2,"data":6},
    {"source":4,"target":0,"data":1},
    {"source":5,"target":0,"data":1},
    {"source":6,"target":0,"data":1},
    {"source":7,"target":0,"data":1},
    {"source":8,"target":0,"data":2}       
  ]
};
console.log(graph1);
// var fgraph = dc.fgraph("#div1")
// 			.graphView(graph)
// 			.resize(960,600);

g5.createGraph();   
g5.ioPlugins.csv.input("test2.csv","Source","Target");
var graph2={},nodes,links;
wait = setInterval(getData,3000);
function getData() {
    nodes = g5.listNodes();
    links = g5.listEdges();
    clearInterval(wait);
    console.log(nodes);
    console.log(links);
    graph2.nodes = nodes;
    graph2.edges =  links;
    console.log("graph");
    console.log(graph2);
    //console.log(JSON.stringify(graph, undefined, 2)); 
    var fgraph = dc.fgraph()
            .init("#div1",graph2,960,600)
            .edgeColors(function(d) { 
                return "red";})

}



//console.log(fgraph);
