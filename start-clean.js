const { spawn } = require("child_process");
const path = require("path");

console.clear();
console.log("✅ Iniciando o projeto...\n");

const concurrentlyPath = process.platform === "win32"
  ? path.join("node_modules", ".bin", "concurrently.cmd")
  : path.join("node_modules", ".bin", "concurrently");

const concurrently = spawn(concurrentlyPath, [
  "npm:backend",
  "npm:frontend"
], {
  shell: true,
  stdio: ["ignore", "pipe", "pipe"] 
});

console.log("✅ Projeto rodando em:");
console.log("🔹 Frontend: http://localhost:4200");
console.log("🔹 Backend (Fake API): http://localhost:3000\n");

concurrently.stderr.on("data", (data) => {
  console.error(`\n🚨 ERRO DETECTADO:\n${data.toString()}`);
});
