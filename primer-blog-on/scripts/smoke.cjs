const {chromium} = require('playwright')
const B='http://localhost:5173'
;(async () => {
  const b = await chromium.launch(); const p = await b.newPage(); const errs=[]
  p.on('pageerror', e => errs.push(e.message))
  const log = async (m) => console.log(m)
  // create
  await p.goto(B+'/posts/new?date=2026-11-23')
  await p.getByRole('button',{name:'投稿予定を登録'}).click()
  await log('validation focus: '+await p.evaluate(()=>document.activeElement.tagName+':'+document.activeElement.getAttribute('aria-invalid')))
  await p.getByLabel('タイトル').fill('新しい記事')
  await p.getByRole('button',{name:'投稿予定を登録'}).click()
  await p.waitForURL(/result=created/); await log('created: '+p.url()+' / '+await p.getByText('投稿予定を登録しました').count())
  // status change to writing
  await p.getByRole('button',{name:'状態を変更'}).click()
  await p.getByRole('menuitemradio',{name:'執筆中'}).click()
  await log('status: '+await p.getByText('状態を変更しました').count())
  // publish
  await p.getByRole('button',{name:'状態を変更'}).click()
  await p.getByRole('menuitemradio',{name:/公開済み/}).click()
  await p.getByRole('button',{name:'公開を記録'}).click()
  await log('url error shown: '+await p.getByText('記事の URL を https://').count())
  await p.getByLabel('記事 URL').fill('https://example.com/blog/99')
  await p.getByRole('button',{name:'公開を記録'}).click()
  await log('published: '+await p.getByText('公開を記録しました').count())
  // back to plan, 11/23 week should no longer be empty
  await p.getByRole('link',{name:'計画に戻る'}).click()
  await log('gap banner after create: '+(await p.getByText('予定の無い週').count()))
  // logout -> guest no create button
  await p.getByRole('button',{name:'ログアウト'}).click()
  await log('guest create btn: '+await p.getByRole('link',{name:'投稿予定を登録'}).count()+' loggedout banner '+await p.getByText('ログアウトしました').count())
  // editor delete
  await p.goto(B+'/posts/6?as=editor')
  await p.getByRole('button',{name:'削除'}).click()
  await p.getByRole('button',{name:'投稿予定を削除'}).click()
  await p.waitForURL(/result=deleted/); await log('deleted: '+await p.getByText('を削除しました。').count()+' overdue banner gone: '+(await p.getByText('予定日を過ぎた投稿').count()===0))
  // member editing other post
  await p.goto(B+'/posts/6/edit'); await log('no-perm: '+await p.getByText('この投稿予定は編集できません').count())
  // save failure
  await p.goto(B+'/posts/7/edit?fail=save'); await p.getByRole('button',{name:'変更を保存'}).click(); await p.waitForTimeout(200)
  await log('save fail banner: '+await p.getByText('変更を保存できませんでした').count())
  console.log('errors', errs)
  await b.close()
})()
