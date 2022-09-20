const CracoAlias = require("craco-alias");

module.exports = {
    mode: "development",
    devServer: {
        port: 3000,
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "options",
                baseUrl: "./",
                aliases: {
                    "@components": "./src/components",
                    "@pages": "./src/pages",
                    // "@store": "./src/store", (왜그런지는 모름)
                    "@assets": "./src/assets",
                },
            },
        },
    ],
};
