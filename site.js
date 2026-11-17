const b=document.querySelector('.menu'),n=document.querySelector('#navigation');b?.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));n.classList.toggle('open',open)});const showcase=document.querySelector('#showcase-video');
if(showcase){
 const play=document.querySelector('#video-play'), caption=document.querySelector('#video-caption'), status=document.querySelector('#video-status'), download=document.querySelector('#video-download');
 const clips={intro:{src:'assets/intro.mp4',label:'Spanish moss in 3D',caption:'Visualizing Spanish moss in a three-dimensional tree scan.'},fieldwork:{src:'assets/fieldwork.mp4',label:'Forest walkthrough',caption:'Collecting forest data with a backpack-mounted scanning system.'},fuel:{src:'assets/FuelDeep3D.mp4',label:'FuelDeep3D',caption:'Classifying forest fuel components from terrestrial laser scanning data using deep learning.'}};
 const selectors=[...document.querySelectorAll('[data-clip]')];
 const order=['intro','fuel','fieldwork'];
 let current='intro';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 showcase.muted=true;showcase.defaultMuted=true;showcase.autoplay=!reduced.matches;
 const sync=()=>{play.textContent=showcase.paused?'Play video':'Pause video';play.setAttribute('aria-label',`${showcase.paused?'Play':'Pause'} ${clips[current].label} video`);};
 const start=()=>showcase.play().catch(()=>{sync();});
 const select=(key,autoplay=true)=>{
  if(key!==current){current=key;showcase.src=clips[key].src;showcase.load();}
  showcase.dataset.kind=key;caption.textContent=clips[key].caption;download.href=clips[key].src;showcase.setAttribute('aria-label',clips[key].label+' video');
  selectors.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.clip===key)));
  status.textContent='';if(autoplay)start();else sync();
 };
 selectors.forEach(b=>b.addEventListener('click',()=>select(b.dataset.clip)));
 play.addEventListener('click',()=>{if(showcase.paused)start();else showcase.pause();});
 showcase.addEventListener('play',sync);showcase.addEventListener('pause',sync);
 showcase.addEventListener('ended',()=>select(order[(order.indexOf(current)+1)%order.length]));
 showcase.addEventListener('error',()=>{status.textContent='Video unavailable. Use “Open video” to watch the clip.';sync();});
 reduced.addEventListener('change',e=>{if(e.matches)showcase.pause();});
 sync();if(!reduced.matches)start();
}
const recordingButton=document.querySelector('#presentation-play');
recordingButton?.addEventListener('click',()=>{
 const frame=document.createElement('iframe');
 frame.src='https://www.youtube-nocookie.com/embed/_b7H3WasvBk?autoplay=1&rel=0';
 frame.title='Spanish moss presentation recording';
 frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
 frame.allowFullscreen=true;
 frame.className='presentation-player';
 recordingButton.replaceWith(frame);
});
