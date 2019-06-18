module.exports = function (RED) {
    "use strict";
    var Viz = require('viz.js');
    var { Module, render } = require('viz.js/full.render.js');

    function graphviz(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        this.name = config.name;
        var options = {
            format:  config.format,
            engine: config.engine
        };
        node.on('input', function (msg) {
            var viz = new Viz({ Module, render });
            viz.renderString(msg.payload,options)
                .then(result => {
                    var newMsg = {
                        payload: result
                    };
                    node.send(newMsg);
                    node.status({ fill: "green", shape: "dot", text: "created" });
                })
                .catch(error => {
                    viz = new Viz({ Module, render });
                    node.status({ fill: "red", shape: "dot", text: error });
                    console.error(error);
                });
        });
    }
    RED.nodes.registerType("graphviz", graphviz);
};
