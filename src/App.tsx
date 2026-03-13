import { useState, useRef } from "react";

const ac = "#ff6b35";

const CATS = [
  { key:"materials", en:"Materials & Supplies", zh:"材料及用品", icon:"🔩" },
  { key:"tools",     en:"Tools & Equipment",    zh:"工具设备",   icon:"🔧" },
  { key:"vehicle",   en:"Vehicle & Transport",  zh:"车辆交通",   icon:"🚗" },
  { key:"sub",       en:"Subcontractors",       zh:"分包商",     icon:"👷" },
  { key:"phone",     en:"Phone & Internet",     zh:"电话网络",   icon:"📱" },
  { key:"office",    en:"Office & Admin",       zh:"办公行政",   icon:"📋" },
  { key:"insurance", en:"Insurance",            zh:"保险",       icon:"🛡️" },
  { key:"accounting",en:"Accounting & Legal",   zh:"会计法律",   icon:"⚖️" },
  { key:"ads",       en:"Advertising",          zh:"广告营销",   icon:"📣" },
  { key:"other",     en:"Other",                zh:"其他",       icon:"📦" },
];

const T: any = {
  en: {
    appName:"SimplyProject Expenses",
    tagline:"Scan receipts. Auto-categorise. BAS done.",
    hero_h1:"Stop drowning", hero_h1b:"in receipts.",
    hero_sub:"Snap a photo of any receipt. AI reads it, categorises it, and builds your BAS report automatically.",
    try_demo:"Try Free →", learn_more:"See how it works ↓",
    built_au:"Built in Australia · For Australian small business",
    feat1_t:"AI Receipt Scan", feat1_d:"Point your camera at any receipt. AI extracts vendor, amount, date and GST instantly.",
    feat2_t:"Auto-Categorise", feat2_d:"AI assigns the right expense category. You confirm in one tap.",
    feat3_t:"GST Tracking", feat3_d:"Every receipt logged with GST breakdown. Know your credits at a glance.",
    feat4_t:"BAS Report", feat4_d:"Quarterly BAS draft generated automatically. Export for your accountant.",
    feat5_t:"CSV Export", feat5_d:"One-click export for your accountant or direct Xero/MYOB import.",
    feat6_t:"Bilingual", feat6_d:"English & Chinese. Switch instantly in Settings.",
    scan_tab:"Scan", expenses_tab:"Expenses", bas_tab:"BAS Report",
    upload_title:"Take photo or upload receipt",
    upload_sub:"AI will read vendor, amount, date & GST",
    scanning:"AI is reading your receipt…",
    scan_done:"Scan complete — review and confirm",
    scan_fail:"Could not read — please fill in manually",
    vendor:"Vendor / Supplier", date_lbl:"Date", total_lbl:"Total (inc GST)",
    gst_lbl:"GST Amount", cat_lbl:"Category", notes_lbl:"Notes",
    notes_ph:"Job reference, description…",
    save_btn:"Add to Expenses", scan_another:"Scan another receipt",
    expenses_title:"All Expenses",
    total_exp:"Total expenses", gst_credits:"GST credits", receipts:"Receipts",
    no_expenses:"No expenses yet — scan your first receipt",
    bas_title:"BAS Draft", bas_sub_label:"Review with your accountant before lodging",
    gst_credits_section:"GST on purchases (credits)",
    field_1b:"1B — GST on purchases",
    field_g11:"Total purchases (excl. GST)",
    by_category:"Expense breakdown by category",
    receipts_scanned:"Total receipts scanned",
    total_inc:"Total expenditure (inc GST)",
    total_gst:"Total GST credits claimable",
    net_excl:"Net expenditure (excl. GST)",
    export_csv:"Download CSV (accountant / Xero import)",
    export_note:"Review with your accountant before lodging BAS",
    no_cat:"No expenses recorded yet",
    draft_badge:"Draft",
    settings_title:"Settings",
    lang_label:"Language", lang_sub:"App display language",
    about_label:"About", about_val:"SimplyProject Expenses v1.0 · Future One Pty Ltd",
    back_landing:"← View Landing Page",
    get_started:"Get Started Free →",
    pricing_title:"Simple pricing.",
    free_plan:"Free", free_price:"$0", free_period:"forever",
    free_f:["10 receipts/month","Basic BAS report","CSV export"],
    pro_plan:"Pro", pro_price:"$12", pro_period:"/month",
    pro_f:["Unlimited receipts","AI auto-categorise","Full BAS report","Xero/MYOB export"],
    team_plan:"Team", team_price:"$22", team_period:"/month",
    team_f:["Pro + 3 users","Shared workspace","Accountant link"],
    ready_h:"Ready to simplify", ready_hb:"your BAS?",
    ready_sub:"Free to try. No sign-up required.",
    footer_copy:"© 2026 Future One Pty Ltd",
  },
  zh: {
    appName:"SimplyProject Expenses",
    tagline:"扫描单据。自动归类。BAS轻松搞定。",
    hero_h1:"告别", hero_h1b:"单据乱局。",
    hero_sub:"拍一张收据照片，AI自动识别供应商、金额、日期和GST，自动生成BAS报告。",
    try_demo:"免费试用 →", learn_more:"了解更多 ↓",
    built_au:"澳洲制造 · 专为澳洲小生意设计",
    feat1_t:"AI扫描单据", feat1_d:"对准任何收据拍照，AI即时提取供应商、金额、日期和GST。",
    feat2_t:"自动归类", feat2_d:"AI自动分配费用类别，一键确认即可。",
    feat3_t:"GST追踪", feat3_d:"每张单据记录GST明细，随时掌握可抵扣税额。",
    feat4_t:"BAS报告", feat4_d:"季度BAS草稿自动生成，导出给会计师即可。",
    feat5_t:"CSV导出", feat5_d:"一键导出，直接导入Xero/MYOB或交给会计师。",
    feat6_t:"中英双语", feat6_d:"中英文一键切换。",
    scan_tab:"扫描", expenses_tab:"费用", bas_tab:"BAS报告",
    upload_title:"拍照或上传单据",
    upload_sub:"AI自动识别供应商、金额、日期和GST",
    scanning:"AI正在识别单据…",
    scan_done:"识别完成 — 确认后保存",
    scan_fail:"识别失败 — 请手动填写",
    vendor:"供应商名称", date_lbl:"日期", total_lbl:"总金额（含GST）",
    gst_lbl:"GST金额", cat_lbl:"费用类别", notes_lbl:"备注",
    notes_ph:"工单编号、用途说明…",
    save_btn:"添加到费用", scan_another:"扫描下一张",
    expenses_title:"所有费用",
    total_exp:"总支出", gst_credits:"GST抵扣", receipts:"单据数",
    no_expenses:"暂无费用记录 — 扫描第一张单据",
    bas_title:"BAS草稿", bas_sub_label:"提交前请与会计师确认",
    gst_credits_section:"采购GST（可抵扣）",
    field_1b:"1B — 采购GST",
    field_g11:"采购总额（不含GST）",
    by_category:"费用分类汇总",
    receipts_scanned:"已扫描单据",
    total_inc:"总支出（含GST）",
    total_gst:"可抵扣GST总额",
    net_excl:"净支出（不含GST）",
    export_csv:"下载CSV（会计师/Xero导入）",
    export_note:"提交BAS前请与会计师确认",
    no_cat:"暂无费用记录",
    draft_badge:"草稿",
    settings_title:"设置",
    lang_label:"语言", lang_sub:"应用显示语言",
    about_label:"关于", about_val:"SimplyProject Expenses v1.0 · Future One Pty Ltd",
    back_landing:"← 返回首页",
    get_started:"免费开始 →",
    pricing_title:"简单定价。",
    free_plan:"免费", free_price:"$0", free_period:"永久",
    free_f:["每月10张单据","基础BAS报告","CSV导出"],
    pro_plan:"Pro", pro_price:"$12", pro_period:"/月",
    pro_f:["无限单据","AI自动归类","完整BAS报告","Xero/MYOB导出"],
    team_plan:"团队", team_price:"$22", team_period:"/月",
    team_f:["Pro + 3个账户","共享工作空间","会计师只读链接"],
    ready_h:"准备好简化", ready_hb:"你的BAS了吗？",
    ready_sub:"免费体验，无需注册。",
    footer_copy:"© 2026 Future One Pty Ltd",
  }
};

const S: any = {
  root:{ minHeight:"100dvh", background:"#0a0a0a", color:"#f0ede8", fontFamily:"'DM Sans',sans-serif", maxWidth:430, margin:"0 auto", position:"relative" },
  card:{ background:"#141414", border:"1px solid #1e1e1e", borderRadius:16, padding:"16px" },
  bigBtn:(bg=ac,color="#0a0a0a")=>({ width:"100%", padding:"14px", background:bg, border:"none", borderRadius:12, color, fontSize:19, fontWeight:800, cursor:"pointer", marginBottom:8 }),
  fField:{ marginBottom:14 },
  fLbl:{ display:"block", fontSize:15, color:"#555", marginBottom:5, fontWeight:600, textTransform:"uppercase" as const, letterSpacing:0.5 },
  fInp:{ width:"100%", padding:"11px 13px", background:"#1a1a1a", border:"1px solid #252525", borderRadius:10, color:"#f0ede8", fontSize:19, outline:"none" },
  nav:{ display:"flex", borderBottom:"1px solid #1a1a1a", marginBottom:20 },
  navTab:(active:boolean)=>({ flex:1, padding:"12px 4px", textAlign:"center" as const, fontSize:17, fontWeight:700, color:active?ac:"#333", borderBottom:`2px solid ${active?ac:"transparent"}`, cursor:"pointer", background:"transparent", border:"none" }),
  overlay:{ position:"fixed" as const, inset:0, background:"#000a", zIndex:200, display:"flex", alignItems:"flex-end" },
  sheet:{ width:"100%", maxWidth:430, margin:"0 auto", background:"#111", borderRadius:"20px 20px 0 0", padding:"0 20px 40px", maxHeight:"92dvh", overflowY:"auto" as const },
  handle:{ width:40, height:4, background:"#2a2a2a", borderRadius:4, margin:"12px auto 20px" },
  toast:{ position:"fixed" as const, bottom:100, left:"50%", transform:"translateX(-50%)", background:ac, color:"#0a0a0a", padding:"12px 22px", borderRadius:50, fontWeight:800, fontSize:18, zIndex:999, whiteSpace:"nowrap" as const },
  metricBox:{ background:"#141414", border:"1px solid #1e1e1e", borderRadius:12, padding:"14px 12px", textAlign:"center" as const, flex:1 },
};

const fmt = (n:number) => "$"+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,",");
const fmtK = (n:number) => n>=1000?"$"+(n/1000).toFixed(1)+"k":fmt(n);

interface Expense {
  id:number; vendor:string; date:string; total:number; gst:number;
  category:string; notes:string; img?:string;
}

export default function App() {
  const [lang, setLang] = useState<"en"|"zh">("en");
  const [screen, setScreen] = useState<"landing"|"app">("landing");
  const [tab, setTab] = useState<"scan"|"expenses"|"bas"|"settings">("scan");
  const [expenses, setExpenses] = useState<Expense[]>([
    {id:1,vendor:"Bunnings Warehouse",date:"2025-03-10",total:143.00,gst:13.00,category:"Materials & Supplies",notes:"PVC pipes and fittings"},
    {id:2,vendor:"BP Service Station",date:"2025-03-11",total:88.50,gst:8.05,category:"Vehicle & Transport",notes:"Fuel — work van"},
    {id:3,vendor:"Telstra",date:"2025-03-12",total:55.00,gst:5.00,category:"Phone & Internet",notes:"Monthly mobile plan"},
  ]);
  const [notif, setNotif] = useState("");
  const [imgPreview, setImgPreview] = useState<string|null>(null);
  const [imgData, setImgData] = useState<{base64:string,mtype:string}|null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [form, setForm] = useState({vendor:"",date:new Date().toISOString().split("T")[0],total:"",gst:"",category:"Materials & Supplies",notes:""});
  const fileRef = useRef<HTMLInputElement>(null);
  const t = T[lang];

  const toast = (msg:string) => { setNotif(msg); setTimeout(()=>setNotif(""),2200); };

  const handleFile = (e:any) => {
    const file = e.target.files?.[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const result = ev.target?.result as string;
      setImgPreview(result);
      const base64 = result.split(",")[1];
      const mtype = result.split(";")[0].split(":")[1];
      setImgData({base64,mtype});
      setScanDone(false); setScanError(false);
      doScan(base64, mtype);
    };
    reader.readAsDataURL(file);
  };

  const doScan = async (base64:string, mtype:string) => {
    setScanning(true);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:800,
          messages:[{role:"user",content:[
            {type:"image",source:{type:"base64",media_type:mtype,data:base64}},
            {type:"text",text:`You are scanning an Australian business receipt. Extract and return ONLY valid JSON:
{"vendor":"business name","date":"YYYY-MM-DD","total":number,"gst":number,"category":"one of: Materials & Supplies|Tools & Equipment|Vehicle & Transport|Subcontractors|Phone & Internet|Office & Admin|Insurance|Accounting & Legal|Advertising|Other","notes":"brief item description"}
GST = total/11 if GST applies, else 0. Return ONLY the JSON object, no markdown.`}
          ]}]
        })
      });
      const data = await resp.json();
      const text = data.content[0].text.replace(/```json|```/g,"").trim();
      const p = JSON.parse(text);
      setForm({
        vendor:p.vendor||"",
        date:p.date||new Date().toISOString().split("T")[0],
        total:(p.total||0).toFixed(2),
        gst:(p.gst||0).toFixed(2),
        category:p.category||"Materials & Supplies",
        notes:p.notes||""
      });
      setScanDone(true);
    } catch {
      setScanError(true);
      setForm(f=>({...f,date:new Date().toISOString().split("T")[0]}));
    } finally { setScanning(false); }
  };

  const saveExpense = () => {
    if(!form.total) return;
    setExpenses(prev=>[...prev,{
      id:Date.now(), vendor:form.vendor||"Unknown",
      date:form.date, total:parseFloat(form.total)||0,
      gst:parseFloat(form.gst)||0, category:form.category,
      notes:form.notes, img:imgPreview||undefined
    }]);
    resetScan();
    toast("✅ Expense saved!");
    setTab("expenses");
  };

  const resetScan = () => {
    setImgPreview(null); setImgData(null);
    setScanning(false); setScanDone(false); setScanError(false);
    setForm({vendor:"",date:new Date().toISOString().split("T")[0],total:"",gst:"",category:"Materials & Supplies",notes:""});
    if(fileRef.current) fileRef.current.value="";
  };

  const totalExp = expenses.reduce((s,e)=>s+e.total,0);
  const totalGst = expenses.reduce((s,e)=>s+e.gst,0);
  const totalNet = totalExp - totalGst;

  const catTotals = CATS.map(c=>({
    ...c,
    amount: expenses.filter(e=>e.category===c.en).reduce((s,e)=>s+e.total,0)
  })).filter(c=>c.amount>0).sort((a,b)=>b.amount-a.amount);

  const exportCSV = () => {
    if(!expenses.length){toast("No expenses yet");return;}
    const rows=[["Date","Vendor","Category","Total (inc GST)","GST","Excl GST","Notes"]];
    expenses.forEach(e=>rows.push([e.date,e.vendor,e.category,e.total.toFixed(2),e.gst.toFixed(2),(e.total-e.gst).toFixed(2),e.notes]));
    const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(",")).join("\n");
    const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
    a.download="SimplyProject_Expenses_BAS.csv"; a.click();
    toast("✅ CSV exported!");
  };

  // ═══ LANDING ═══
  if(screen==="landing") return (
    <div style={{...S.root,background:"#080808"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700;800;900&display=swap');*{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}button,input,select,textarea{font-family:inherit;}`}</style>

      {/* NAV */}
      <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,padding:"15px 20px",background:"#08080899",backdropFilter:"blur(20px)",borderBottom:"1px solid #ffffff08",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:7,fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#f0ede8"}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:ac}}/>
          <span>SimplyProject</span>
          <span style={{fontSize:13,fontWeight:700,color:ac,background:ac+"22",border:`1px solid ${ac}30`,borderRadius:6,padding:"2px 7px",marginLeft:2}}>Expenses</span>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setLang(lang==="en"?"zh":"en")} style={{padding:"6px 13px",background:"#141414",border:"1px solid #1e1e1e",borderRadius:20,color:"#555",fontWeight:700,fontSize:16,cursor:"pointer"}}>{lang==="en"?"中文":"EN"}</button>
          <button onClick={()=>setScreen("app")} style={{padding:"6px 14px",background:ac,border:"none",borderRadius:20,color:"#0a0a0a",fontWeight:800,fontSize:16,cursor:"pointer"}}>{t.get_started}</button>
        </div>
      </div>

      {/* HERO */}
      <div style={{padding:"108px 24px 56px",textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:ac+"22",border:`1px solid ${ac}30`,borderRadius:50,padding:"5px 14px",fontSize:15,color:ac,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:24}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:ac}}/>
          {lang==="zh"?"澳洲小生意专属":"Built for Australian small business"}
        </div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(36px,10vw,68px)",fontWeight:800,lineHeight:1.0,letterSpacing:-2,marginBottom:18,color:"#f0ede8"}}>
          {t.hero_h1}<br/><span style={{color:ac}}>{t.hero_h1b}</span>
        </h1>
        <p style={{fontSize:20,color:"#555",lineHeight:1.7,marginBottom:32,maxWidth:360,margin:"0 auto 32px"}}>{t.hero_sub}</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setScreen("app")} style={{padding:"14px 26px",background:ac,border:"none",borderRadius:50,color:"#0a0a0a",fontWeight:800,fontSize:20,cursor:"pointer"}}>{t.try_demo}</button>
          <button onClick={()=>document.getElementById("feat")?.scrollIntoView({behavior:"smooth"})} style={{padding:"14px 22px",background:"transparent",border:"1px solid #1e1e1e",borderRadius:50,color:"#555",fontWeight:700,fontSize:20,cursor:"pointer"}}>{t.learn_more}</button>
        </div>
        {/* business type pills */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginTop:36}}>
          {["🔨 Builders","🔧 Plumbers","⚡ Electricians","🧹 Cleaners","🍜 Cafes","🛒 Retailers","💇 Salons","🚛 Trades"].map(b=>(
            <div key={b} style={{background:"#141414",border:"1px solid #1e1e1e",borderRadius:50,padding:"6px 13px",fontSize:15,color:"#444",fontWeight:600}}>{b}</div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div id="feat" style={{padding:"56px 20px"}}>
        <div style={{fontSize:15,color:ac,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:12,textAlign:"center"}}>{lang==="zh"?"核心功能":"Why SimplyProject Expenses"}</div>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:30,fontWeight:800,letterSpacing:-1,textAlign:"center",marginBottom:28,lineHeight:1.2}}>
          {lang==="zh"?<>一切你需要的<br/><span style={{color:ac}}>没有多余的</span></>:<>Everything you need.<br/><span style={{color:ac}}>Nothing you don't.</span></>}
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[["📷",t.feat1_t,t.feat1_d],["🗂️",t.feat2_t,t.feat2_d],["💰",t.feat3_t,t.feat3_d],["📊",t.feat4_t,t.feat4_d],["📤",t.feat5_t,t.feat5_d],["🌐",t.feat6_t,t.feat6_d]].map(([icon,title,desc])=>(
            <div key={title as string} style={{background:"#141414",border:"1px solid #1e1e1e",borderRadius:14,padding:"16px 14px"}}>
              <div style={{fontSize:28,marginBottom:8}}>{icon}</div>
              <div style={{fontSize:17,fontWeight:800,color:"#f0ede8",marginBottom:5,lineHeight:1.3}}>{title}</div>
              <div style={{fontSize:15,color:"#444",lineHeight:1.6}}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{padding:"40px 20px",background:"#0f0f0f"}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,letterSpacing:-1,textAlign:"center",marginBottom:28}}>
          {lang==="zh"?"三步搞定BAS":"3 steps to BAS done."}
        </h2>
        {[
          [ac,"01",lang==="zh"?"拍照单据":"Snap the receipt",lang==="zh"?"任何单据，任何格式":"Any receipt. Any format."],
          ["#22c55e","02",lang==="zh"?"AI自动识别":"AI reads everything",lang==="zh"?"供应商、金额、GST、类别":"Vendor, amount, GST, category."],
          ["#38bdf8","03",lang==="zh"?"导出BAS草稿":"Export BAS draft",lang==="zh"?"一键CSV，交给会计师":"One-click CSV for your accountant."],
        ].map(([color,num,title,sub])=>(
          <div key={num as string} style={{display:"flex",gap:16,alignItems:"flex-start",marginBottom:22}}>
            <div style={{width:42,height:42,borderRadius:12,background:color as string+"22",border:`1px solid ${color}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18,fontWeight:900,color:color as string}}>{num}</div>
            <div>
              <div style={{fontSize:19,fontWeight:800,color:"#f0ede8",marginBottom:3}}>{title}</div>
              <div style={{fontSize:16,color:"#444"}}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* PRICING */}
      <div style={{padding:"40px 20px 56px"}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,letterSpacing:-1,textAlign:"center",marginBottom:22}}>{t.pricing_title}</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9}}>
          {[
            {plan:t.free_plan,price:t.free_price,period:t.free_period,features:t.free_f,pro:false},
            {plan:t.pro_plan,price:t.pro_price,period:t.pro_period,features:t.pro_f,pro:true},
            {plan:t.team_plan,price:t.team_price,period:t.team_period,features:t.team_f,pro:false},
          ].map(({plan,price,period,features,pro})=>(
            <div key={plan} style={{background:pro?ac:"#141414",border:`1px solid ${pro?ac:"#1e1e1e"}`,borderRadius:14,padding:"16px 12px"}}>
              <div style={{fontSize:13,fontWeight:700,color:pro?"#0007":"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{plan}</div>
              <div style={{fontSize:30,fontWeight:900,color:pro?"#0a0a0a":"#f0ede8",letterSpacing:-1}}>{price}</div>
              <div style={{fontSize:15,color:pro?"#0007":"#333",marginBottom:12}}>{period}</div>
              {(features as string[]).map(f=><div key={f} style={{fontSize:14,color:pro?"#0a0a0a":"#444",marginBottom:3}}>✓ {f}</div>)}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{padding:"40px 24px 72px",textAlign:"center",background:"#0f0f0f"}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:30,fontWeight:800,letterSpacing:-1,marginBottom:14}}>
          {t.ready_h}<br/><span style={{color:ac}}>{t.ready_hb}</span>
        </h2>
        <p style={{color:"#444",fontSize:20,marginBottom:26}}>{t.ready_sub}</p>
        <button onClick={()=>setScreen("app")} style={{padding:"15px 34px",background:ac,border:"none",borderRadius:50,color:"#0a0a0a",fontWeight:800,fontSize:20,cursor:"pointer",marginBottom:12}}>📷 {t.try_demo}</button>
        <div style={{fontSize:15,color:"#333"}}>{t.built_au}</div>
      </div>

      {/* FOOTER */}
      <div style={{padding:"18px 24px 36px",borderTop:"1px solid #1a1a1a",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:7,fontFamily:"'Syne',sans-serif",fontWeight:800,color:"#f0ede8",fontSize:17}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:ac}}/>
          SimplyProject <span style={{color:ac,fontSize:13,marginLeft:3}}>Expenses</span>
        </div>
        <div style={{fontSize:15,color:"#333"}}>{t.footer_copy} · <a href="https://futureone.au" style={{color:"#444",textDecoration:"none"}}>futureone.au</a></div>
      </div>
    </div>
  );

  // ═══ APP ═══
  const now = new Date();
  const qNames = ["Jan–Mar","Apr–Jun","Jul–Sep","Oct–Dec"];
  const qNamesZh = ["1–3月","4–6月","7–9月","10–12月"];
  const q = Math.floor(now.getMonth()/3);
  const qLabel = `Q${q+1} ${now.getFullYear()} · ${lang==="zh"?qNamesZh[q]:qNames[q]}`;

  return (
    <div style={S.root}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800;900&display=swap');*{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}button,input,select,textarea{font-family:inherit;}select option{background:#141414;}::-webkit-scrollbar{display:none;}`}</style>

      {/* APP HEADER */}
      <div style={{padding:"18px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:7,fontSize:20,fontWeight:900,color:"#f0ede8"}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:ac}}/>
          <span>SimplyProject</span>
          <span style={{fontSize:13,fontWeight:700,color:ac,background:ac+"22",border:`1px solid ${ac}30`,borderRadius:6,padding:"2px 7px"}}>{lang==="zh"?"费用":"Expenses"}</span>
        </div>
        <button onClick={()=>setLang(lang==="en"?"zh":"en")} style={{padding:"6px 13px",background:"#141414",border:"1px solid #1e1e1e",borderRadius:20,color:"#555",fontWeight:700,fontSize:15,cursor:"pointer"}}>{lang==="en"?"中文":"EN"}</button>
      </div>

      {/* NAV TABS */}
      <div style={S.nav}>
        {(["scan","expenses","bas","settings"] as const).map(tabKey=>(
          <button key={tabKey} style={S.navTab(tab===tabKey)} onClick={()=>setTab(tabKey)}>
            {tabKey==="scan"?"📷":tabKey==="expenses"?"🗂️":tabKey==="bas"?"📊":"⚙️"}
            {" "}{tabKey==="scan"?t.scan_tab:tabKey==="expenses"?t.expenses_tab:tabKey==="bas"?t.bas_tab:(lang==="zh"?"设置":"Settings")}
          </button>
        ))}
      </div>

      <div style={{padding:"0 20px 100px",overflowY:"auto"}}>

        {/* ── SCAN TAB ── */}
        {tab==="scan"&&(
          <div>
            {!imgPreview?(
              <div onClick={()=>fileRef.current?.click()} style={{border:"1.5px dashed #252525",borderRadius:16,padding:"36px 20px",textAlign:"center",cursor:"pointer",marginBottom:16,background:"#111"}}>
                <div style={{fontSize:44,marginBottom:12}}>📷</div>
                <div style={{fontSize:20,fontWeight:800,color:"#f0ede8",marginBottom:5}}>{t.upload_title}</div>
                <div style={{fontSize:16,color:"#444"}}>{t.upload_sub}</div>
                <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={handleFile}/>
              </div>
            ):(
              <div>
                <img src={imgPreview} style={{width:"100%",maxHeight:200,objectFit:"contain",borderRadius:12,marginBottom:12,border:"1px solid #1e1e1e"}}/>
                <div style={{textAlign:"center",fontSize:17,marginBottom:14,color:scanError?"#f87171":scanDone?ac:"#555"}}>
                  {scanning&&<span>⏳ {t.scanning}</span>}
                  {scanDone&&<span>✅ {t.scan_done}</span>}
                  {scanError&&<span>⚠️ {t.scan_fail}</span>}
                </div>
                {(scanDone||scanError)&&(
                  <div>
                    <div style={S.fField}><label style={S.fLbl}>{t.vendor}</label><input style={S.fInp} value={form.vendor} onChange={e=>setForm(f=>({...f,vendor:e.target.value}))} placeholder="e.g. Bunnings Warehouse"/></div>
                    <div style={{display:"flex",gap:10}}>
                      <div style={{...S.fField,flex:1}}><label style={S.fLbl}>{t.date_lbl}</label><input style={S.fInp} type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div>
                      <div style={{...S.fField,flex:1}}><label style={S.fLbl}>{t.total_lbl}</label><input style={S.fInp} type="number" step="0.01" value={form.total} onChange={e=>setForm(f=>({...f,total:e.target.value}))} placeholder="0.00"/></div>
                    </div>
                    <div style={{display:"flex",gap:10}}>
                      <div style={{...S.fField,flex:1}}><label style={S.fLbl}>{t.gst_lbl}</label><input style={S.fInp} type="number" step="0.01" value={form.gst} onChange={e=>setForm(f=>({...f,gst:e.target.value}))} placeholder="0.00"/></div>
                      <div style={{...S.fField,flex:1}}><label style={S.fLbl}>{t.cat_lbl}</label>
                        <select style={S.fInp} value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
                          {CATS.map(c=><option key={c.key} value={c.en}>{c.icon} {lang==="zh"?c.zh:c.en}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={S.fField}><label style={S.fLbl}>{t.notes_lbl}</label><input style={S.fInp} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder={t.notes_ph}/></div>
                    <button style={S.bigBtn()} onClick={saveExpense}>{t.save_btn}</button>
                    <button style={S.bigBtn("#1a1a1a","#555")} onClick={resetScan}>{t.scan_another}</button>
                  </div>
                )}
              </div>
            )}
            {/* quick stats */}
            <div style={{display:"flex",gap:10,marginTop:8}}>
              {[[fmtK(totalExp),t.total_exp],[fmt(totalGst),t.gst_credits],[String(expenses.length),t.receipts]].map(([v,l])=>(
                <div key={l as string} style={S.metricBox}>
                  <div style={{fontSize:20,fontWeight:900,color:"#f0ede8"}}>{v}</div>
                  <div style={{fontSize:13,color:"#444",marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── EXPENSES TAB ── */}
        {tab==="expenses"&&(
          <div>
            <div style={{display:"flex",gap:10,marginBottom:18}}>
              {[[fmtK(totalExp),t.total_exp],[fmt(totalGst),t.gst_credits,"#22c55e"],[String(expenses.length),t.receipts]].map(([v,l,col])=>(
                <div key={l as string} style={S.metricBox}>
                  <div style={{fontSize:20,fontWeight:900,color:(col as string)||"#f0ede8"}}>{v}</div>
                  <div style={{fontSize:13,color:"#444",marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:17,fontWeight:800,color:"#f0ede8",marginBottom:12}}>{t.expenses_title}</div>
            {expenses.length===0?(
              <div style={{textAlign:"center",padding:"40px 0",color:"#333",fontSize:18}}>{t.no_expenses}</div>
            ):(
              [...expenses].reverse().map(e=>(
                <div key={e.id} style={{...S.card,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:18,fontWeight:800,color:"#f0ede8",marginBottom:3}}>{e.vendor}</div>
                    <div style={{fontSize:15,color:"#444",marginBottom:4}}>{e.date}</div>
                    <div style={{display:"inline-block",background:ac+"22",border:`1px solid ${ac}30`,borderRadius:6,padding:"2px 8px",fontSize:13,color:ac,fontWeight:700}}>
                      {CATS.find(c=>c.en===e.category)?.icon} {lang==="zh"?CATS.find(c=>c.en===e.category)?.zh:e.category}
                    </div>
                    {e.notes&&<div style={{fontSize:14,color:"#333",marginTop:4}}>{e.notes}</div>}
                  </div>
                  <div style={{textAlign:"right",marginLeft:12,flexShrink:0}}>
                    <div style={{fontSize:20,fontWeight:900,color:"#f0ede8"}}>{fmt(e.total)}</div>
                    <div style={{fontSize:14,color:"#22c55e"}}>GST {fmt(e.gst)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── BAS TAB ── */}
        {tab==="bas"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div>
                <div style={{fontSize:22,fontWeight:900,color:"#f0ede8"}}>{t.bas_title}</div>
                <div style={{fontSize:15,color:"#444"}}>{qLabel}</div>
              </div>
              <div style={{background:ac+"22",border:`1px solid ${ac}40`,borderRadius:6,padding:"3px 10px",fontSize:13,color:ac,fontWeight:700}}>{t.draft_badge}</div>
            </div>

            <div style={{...S.card,marginBottom:12}}>
              <div style={{fontSize:13,color:"#444",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>{t.gst_credits_section}</div>
              <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #1a1a1a"}}>
                <span style={{fontSize:17}}>{t.field_1b}</span>
                <span style={{fontSize:17,fontWeight:800,color:"#22c55e"}}>{fmt(totalGst)}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}>
                <span style={{fontSize:16,color:"#444"}}>{t.field_g11}</span>
                <span style={{fontSize:16}}>{fmt(totalNet)}</span>
              </div>
            </div>

            <div style={{...S.card,marginBottom:12}}>
              <div style={{fontSize:13,color:"#444",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>{t.by_category}</div>
              {catTotals.length===0?(
                <div style={{fontSize:16,color:"#333"}}>{t.no_cat}</div>
              ):catTotals.map(c=>(
                <div key={c.key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid #1a1a1a"}}>
                  <span style={{fontSize:16,color:"#555"}}>{c.icon} {lang==="zh"?c.zh:c.en}</span>
                  <span style={{fontSize:16,fontWeight:700}}>{fmt(c.amount)}</span>
                </div>
              ))}
            </div>

            <div style={{...S.card,marginBottom:16}}>
              {[[t.receipts_scanned,String(expenses.length)],[t.total_inc,fmt(totalExp)],[t.total_gst,fmt(totalGst),true],[t.net_excl,fmt(totalNet)]].map(([label,val,green])=>(
                <div key={label as string} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #1a1a1a"}}>
                  <span style={{fontSize:16,color:"#444"}}>{label}</span>
                  <span style={{fontSize:16,fontWeight:700,color:green?"#22c55e":"#f0ede8"}}>{val}</span>
                </div>
              ))}
            </div>

            <button style={S.bigBtn()} onClick={exportCSV}>📤 {t.export_csv}</button>
            <div style={{fontSize:14,color:"#333",textAlign:"center",marginTop:6}}>{t.export_note}</div>
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {tab==="settings"&&(
          <div>
            <div style={{fontSize:22,fontWeight:900,color:"#f0ede8",marginBottom:18}}>{t.settings_title}</div>
            <div style={{...S.card,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:18,fontWeight:700,color:"#f0ede8"}}>{t.lang_label}</div><div style={{fontSize:15,color:"#444"}}>{t.lang_sub}</div></div>
                <button onClick={()=>setLang(lang==="en"?"zh":"en")} style={{padding:"8px 18px",background:ac,border:"none",borderRadius:10,color:"#0a0a0a",fontWeight:800,fontSize:17,cursor:"pointer"}}>{lang==="en"?"中文":"EN"}</button>
              </div>
            </div>
            <div style={{...S.card,marginBottom:10}}>
              <div><div style={{fontSize:18,fontWeight:700,color:"#f0ede8"}}>{t.about_label}</div><div style={{fontSize:15,color:"#444",marginTop:3}}>{t.about_val}</div></div>
            </div>
            <button style={S.bigBtn("#1a1a1a","#444")} onClick={()=>setScreen("landing")}>{t.back_landing}</button>
          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"#111",borderTop:"1px solid #1a1a1a",display:"flex",paddingBottom:"env(safe-area-inset-bottom)"}}>
        {(["scan","expenses","bas","settings"] as const).map(tabKey=>(
          <button key={tabKey} onClick={()=>setTab(tabKey)} style={{flex:1,padding:"10px 0 8px",background:"transparent",border:"none",cursor:"pointer",color:tab===tabKey?ac:"#333"}}>
            <div style={{fontSize:20}}>{tabKey==="scan"?"📷":tabKey==="expenses"?"🗂️":tabKey==="bas"?"📊":"⚙️"}</div>
            <div style={{fontSize:11,fontWeight:700}}>{tabKey==="scan"?t.scan_tab:tabKey==="expenses"?t.expenses_tab:tabKey==="bas"?t.bas_tab:(lang==="zh"?"设置":"Settings")}</div>
          </button>
        ))}
      </div>

      {notif&&<div style={S.toast}>{notif}</div>}
    </div>
  );
}
