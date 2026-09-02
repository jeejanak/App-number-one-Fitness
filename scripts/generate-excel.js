#!/usr/bin/env node
// Generates docs/Momentum_Users.xlsx — date-wise tabs, never deletes, rebuilds daily
// Input: data/users.json [{email,name,createdAt,date}]
// Output: docs/Momentum_Users.xlsx with Master + per-date sheets
import fs from 'fs'
import path from 'path'
import ExcelJS from 'exceljs'

const USERS_JSON = 'data/users.json'
const OUT_XLSX = 'docs/Momentum_Users.xlsx'

function loadUsers(){
  try{ return JSON.parse(fs.readFileSync(USERS_JSON,'utf8')) }catch{ return [] }
}

async function main(){
  const users = loadUsers()
  // group by date
  const byDate = {}
  for(const u of users){
    const d = (u.date || u.createdAt?.slice(0,10) || 'unknown')
    if(!byDate[d]) byDate[d]=[]
    byDate[d].push(u)
  }
  const dates = Object.keys(byDate).sort()
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Momentum'
  wb.created = new Date()

  // Master sheet — all users (includes phone, optional)
  const master = wb.addWorksheet('Master', {properties:{tabColor:{argb:'0EA5E9'}}})
  master.columns = [
    {header:'Date', key:'date', width:14},
    {header:'Email', key:'email', width:32},
    {header:'Name', key:'name', width:20},
    {header:'Phone', key:'phone', width:20},
    {header:'Country', key:'countryCode', width:10},
    {header:'Created At', key:'createdAt', width:24},
    {header:'Source', key:'source', width:12}
  ]
  master.getRow(1).font={bold:true, color:{argb:'FFFFFF'}}; master.getRow(1).fill={type:'pattern', pattern:'solid', fgColor:{argb:'0EA5E9'} }
  for(const d of dates){
    for(const u of byDate[d]){
      master.addRow({date:d, email:u.email, name:u.name, phone:u.phone||'', countryCode:u.countryCode||'', createdAt:u.createdAt, source:u.source||'pwa'})
    }
  }
  master.autoFilter='A1:G1'
  master.views=[{state:'frozen', ySplit:1}]

  // Per-date sheets — never delete, only add
  for(const d of dates){
    const ws = wb.addWorksheet(d, {properties:{tabColor:{argb:'6366F1'}}})
    ws.columns = master.columns
    ws.getRow(1).font={bold:true, color:{argb:'FFFFFF'}}; ws.getRow(1).fill={type:'pattern', pattern:'solid', fgColor:{argb:'6366F1'}}
    for(const u of byDate[d]) ws.addRow({date:d, email:u.email, name:u.name, phone:u.phone||'', countryCode:u.countryCode||'', createdAt:u.createdAt, source:u.source||'pwa'})
    ws.autoFilter='A1:G1'
    ws.views=[{state:'frozen', ySplit:1}]
  }
  if(dates.length===0){
    const ws = wb.addWorksheet('2026-09-02')
    ws.columns=master.columns; ws.getRow(1).font={bold:true}; ws.getRow(1).fill={type:'pattern', pattern:'solid', fgColor:{argb:'0EA5E9'}}
  }
  fs.mkdirSync(path.dirname(OUT_XLSX), {recursive:true})
  await wb.xlsx.writeFile(OUT_XLSX)
  console.log(`Wrote ${OUT_XLSX} — ${users.length} users, ${dates.length} date tabs: ${dates.join(', ')}`)
}
main().catch(e=>{console.error(e); process.exit(1)})
