const { execSync } = require("child_process");
const path = require("path");

const webDir = path.resolve(__dirname, "..");
execSync("npx next lint", { cwd: webDir, stdio: "inherit" });
