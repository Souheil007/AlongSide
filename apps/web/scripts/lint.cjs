const { execSync } = require("child_process");
const path = require("path");

const webDir = path.resolve(__dirname, "..");
try {
  require.resolve("eslint");
  execSync("npx next lint", { cwd: webDir, stdio: "inherit" });
} catch {
  console.log("ESLint not installed in apps/web. Skipping next lint.");
}
