export async function handler(event){
  if(event.httpMethod!=='POST') return {statusCode:405, body:'Method Not Allowed'}
  try{
    const {email, name, createdAt, phone, countryCode} = JSON.parse(event.body||'{}')
    if(!email||!email.includes('@')) return {statusCode:400, body:'Invalid email'}
    const date = (createdAt||new Date().toISOString()).slice(0,10)
    const token = process.env.GITHUB_TOKEN
    const repo = process.env.GITHUB_REPO || 'jeejanak/App-number-one-Fitness'
    if(!token) return {statusCode:500, body:'GITHUB_TOKEN not set in Netlify env'}
    // Fetch existing users.json via GitHub API
    const apiBase = `https://api.github.com/repos/${repo}/contents/data/users.json`
    let sha, users=[]
    try{
      const r = await fetch(apiBase, {headers:{Authorization:`Bearer ${token}`, Accept:'application/vnd.github+json'}})
      if(r.ok){
        const j=await r.json()
        sha=j.sha
        users=JSON.parse(Buffer.from(j.content,'base64').toString('utf8'))
      }
    }catch{}
    const existing = users.find(u=>u.email.toLowerCase()===email.toLowerCase())
    if(existing){
      // update phone if provided and missing
      if(phone && !existing.phone){ existing.phone=phone; existing.countryCode=countryCode||'' }
      else return {statusCode:200, body:JSON.stringify({ok:true, deduped:true})}
    } else {
      users.push({email:email.toLowerCase(), name: name||email.split('@')[0], phone: phone||'', countryCode: countryCode||'', createdAt: createdAt||new Date().toISOString(), date, source:'pwa'})
    }
    const content = Buffer.from(JSON.stringify(users,null,2)).toString('base64')
    const put = await fetch(apiBase, {
      method:'PUT',
      headers:{Authorization:`Bearer ${token}`, Accept:'application/vnd.github+json', 'Content-Type':'application/json'},
      body: JSON.stringify({message:`collect: ${email} ${date}`, content, sha})
    })
    if(!put.ok) return {statusCode: put.status, body: await put.text()}
    return {statusCode:200, body:JSON.stringify({ok:true})}
  }catch(e){
    return {statusCode:500, body: String(e)}
  }
}
