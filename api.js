const express = require("express");
const fs = require("fs");
const axios = require("axios");
const pth = require("path");
const glob = require("glob");
const colors = require("colors");
const bodyParser = require('body-parser');

//custom colors for beautiful console.log()
colors.setTheme({
   main: ['cyan', 'bold'],
   silly: 'rainbow',
   input: 'grey',
   verbose: 'cyan',
   prompt: 'grey',
   info: 'green',
   data: 'grey',
   help: 'cyan',
   warn: 'yellow',
   debug: 'blue',
   error: 'brightRed'
});

// start
const app = express();
app.use(bodyParser.json());

function routeLoader(dir) {
    const files = glob.sync(`${dir}/**/*.js`);
    
    try {
        console.log(`┏━━━━━━❰ ` + `Loading Routes...`.main + ` ❱━━━━━ꕥ`);
        files.forEach((file) => {
            const route = require(pth.join(__dirname, file));
            
            if(route.path !== undefined) {
                
                // import route options
                const {
                    name,
                    path,
                    type,
                    details,
                    isDisable,
                    hidden,
                    code
                } = route;
                
                // register routePath 
                let routePath = (path.startsWith("/") ? path : "/" + path);
                
                // check the route method 
                if(type === undefined) {
                    console.log("\n\n[Route Handler]".main, "Error at file route:".warn, file.debug, "-", "Route method type can't be undefined!".error)
                    process.exit()
                }
                
                
                // create route 
                app[type](routePath, async(req, res) => {
                    // options 
                    const name = route.name ? route.name : "none";
                    const rpath = route.path ? route.path : undefined;
                    const details = route.details ? route.details : null;
                    const isDisable = route.isDisable ? route.isDisable : false;
                    const hidden = route.hidden ? route.hidden : false;
                    const query = req.query;
                    
                    // is route disable?
                    if (isDisable === true) {
                        let msg = { status: 403, message: "this route is in disable mode!" };
                        res.status(403).send(msg);
                        return;
                    }
                    
                    const routeOptions = {
                        name,
                        rpath,
                        details,
                        isDisable,
                        hidden,
                        query,
                        axios
                    };
                    
                    // executing code from route 
                    try {
                        await code(req, res, routeOptions);
                    } catch (e) {
                        res.status(500).json({
                            status: 500,
                            message: "something went wrong from internal server"
                        });
                        console.log("\n\n[Route Handler]".main, "Error at file route:".warn, file.debug, "-", e)
                    }
                });
                let status = isDisable ? 'Disable'.error : 'Active'.info;
                hidden ? false : console.log(`┃ ⬤ ` + `${status}` + ' - ' + `Loading `.info + `${name}`.warn + ` on route: `.info + `${path}`.debug);
             }
            route.path ? undefined : console.log(`┃ ⬤ ` + `Failed to load`.error + ` ${route.name ? route.name : "none"}`.warn + ` on location: `.info + file.debug);
        });
        console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ꕥ`);
    } catch (e) {
        console.log("\n\n[Route Handler]".main, "Error:".warn, e)
    }
}

routeLoader("routes");

module.exports = app;