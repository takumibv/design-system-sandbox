const ts=require('typescript'),fs=require('fs'),path=require('path');
const dir='src_copy';const out=[];
const walk=d=>fs.readdirSync(d).forEach(f=>{const p=path.join(d,f);if(fs.statSync(p).isDirectory())walk(p);else if(/\.tsx?$/.test(f)&&!/fixtures/.test(f))scan(p)});
function scan(p){const sf=ts.createSourceFile(p,fs.readFileSync(p,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const v=n=>{let t=null;if(ts.isJsxText(n))t=n.getText();else if(ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n))t=n.text;else if(ts.isTemplateExpression(n))t=n.getText().slice(1,-1).replace(/\$\{[^}]*\}/g,'○');
  if(t&&/[ぁ-んァ-ヶ一-龠]/.test(t)&&!/^\s*\/\//.test(t)){const ln=sf.getLineAndCharacterOfPosition(n.getStart()).line+1;out.push(`- ${t.replace(/\s+/g,' ').trim()} <!-- ${path.basename(p)}:${ln} -->`)}
  ts.forEachChild(n,v)};v(sf)}
walk(dir);fs.writeFileSync('ui/ui-strings.md','# UI 文言\n\n'+out.join('\n')+'\n');console.log(out.length)
