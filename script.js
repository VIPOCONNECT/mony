
let slides = [];
function loadDemo() {
  slides = [
    {image:"https://picsum.photos/id/237/800/600",text:"דוגמה ראשונה",pos:"top",anim:"fade",font:"Arial"},
    {image:"https://picsum.photos/id/238/800/600",text:"דוגמה שנייה",pos:"center",anim:"slide",font:"Tahoma"}
  ];
  renderSlides();
  generatePreview();
}
function newProject(){slides=[];renderSlides();generatePreview();}
function addSlide(){slides.push({image:"",text:"",pos:"center",anim:"fade",font:"Arial"});renderSlides();}
function renderSlides(){
  let html='';
  slides.forEach((s,i)=>{
    html+=`
    <div class="slide-config">
      תמונה<input onchange="slides[${i}].image=this.value" value="${s.image}" placeholder="URL תמונה">
      טקסט<input onchange="slides[${i}].text=this.value" value="${s.text}" placeholder="טקסט">
      מיקום<select onchange="slides[${i}].pos=this.value">
        <option ${s.pos=='top'?'selected':''}>top</option>
        <option ${s.pos=='center'?'selected':''}>center</option>
        <option ${s.pos=='bottom'?'selected':''}>bottom</option>
      </select>
      אנימציה<select onchange="slides[${i}].anim=this.value">
        <option ${s.anim=='fade'?'selected':''}>fade</option>
        <option ${s.anim=='slide'?'selected':''}>slide</option>
        <option ${s.anim=='zoom'?'selected':''}>zoom</option>
      </select>
      פונט<select onchange="slides[${i}].font=this.value">
        <option ${s.font=='Arial'?'selected':''}>Arial</option>
        <option ${s.font=='Tahoma'?'selected':''}>Tahoma</option>
        <option ${s.font=='Verdana'?'selected':''}>Verdana</option>
      </select>
    </div>`;
  });
  document.getElementById('slidesContainer').innerHTML=html;
}
function generatePreview(){
  let frame=document.getElementById('previewFrame').contentWindow.document;
  frame.open();
  let html=`<style>
  body,html{margin:0;height:100%;overflow:hidden}
  .slide{display:none;width:100%;height:100%;background-size:cover;position:absolute;top:0;left:0}
  .text{position:absolute;width:100%;text-align:center;color:#fff;background:rgba(0,0,0,0.5);padding:10px}
  .top{top:0}.center{top:50%;transform:translateY(-50%)}.bottom{bottom:0}
  @keyframes fade{from{opacity:0}to{opacity:1}}@keyframes slide{from{left:100%}to{left:0}}@keyframes zoom{from{transform:scale(0)}to{transform:scale(1)}}
  </style>`;
  slides.forEach((s,i)=>{
    html+=`<div class="slide" style="background-image:url('${s.image}');animation:${s.anim} 1s;${i==0?'display:block':''}">
      <div class="text ${s.pos}" style="font-family:${s.font}">${s.text}</div>
    </div>`;
  });
  html+=`<script>
  let idx=0,s=document.querySelectorAll('.slide');
  setInterval(()=>{s[idx].style.display='none';idx=++idx%s.length;s[idx].style.display='block'},3000);
  <\/script>`;
  frame.write(html);
  frame.close();
}
function downloadHTML(){
  generatePreview();
  let html=document.getElementById('previewFrame').contentWindow.document.documentElement.outerHTML;
  let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([html],{type:'text/html'}));
  a.download='banner.html';a.click();
}
function editAgain(){renderSlides();}
window.onload=loadDemo;
