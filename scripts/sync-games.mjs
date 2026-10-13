import { mkdtempSync, rmSync, cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
const temp=mkdtempSync(join(tmpdir(),"softdown-lhs-"));
const repo=join(temp,"A7-forge-2D-");
const game=join(repo,"games","lan_house_simulator");
const output=resolve("public/play/lan-house-simulator");
const ref=process.env.LHS_GAME_REF?.trim()||"main";
if(!/^[a-zA-Z0-9._/-]+$/.test(ref)||ref.startsWith("-"))throw new Error("LHS_GAME_REF inválido");
const run=(cmd,args,cwd)=>execFileSync(cmd,args,{cwd,stdio:"inherit",env:process.env,timeout:180000});
try {
  run("git",["clone","--quiet","--depth","1","--branch",ref,"https://github.com/Softdown-prog/A7-forge-2D-.git",repo],temp);
  // O jogo ainda não versiona package-lock; usar install até o lock ser publicado.
  const locked=existsSync(join(game,"package-lock.json"));
  run("npm",locked?["ci","--no-audit","--no-fund"]:["install","--no-package-lock","--no-audit","--no-fund"],game);
  run("npm",["run","build"],game);
  const built=join(game,"dist");
  for(const file of ["index.html","style.css","js/main.js"]){
    if(!existsSync(join(built,file)))throw new Error("Jogo incompleto: "+file);
  }
  rmSync(output,{recursive:true,force:true});mkdirSync(output,{recursive:true});
  cpSync(built,output,{recursive:true});
  console.log("Lan House HTML5 publicado em /play/lan-house-simulator/:",readdirSync(output).join(", "));
} finally { rmSync(temp,{recursive:true,force:true}); }
