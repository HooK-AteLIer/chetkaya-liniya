
const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d'),image=new Image(),range={value:0,addEventListener:()=>{}},status={textContent:''},journey=document.querySelector('.hero'),reduce=matchMedia('(prefers-reduced-motion: reduce)');const heroGates=['(max-width: 720px)','(orientation: portrait) and (max-width: 1024px)','(orientation: portrait) and (pointer: coarse)','(orientation: landscape) and (pointer: coarse) and (max-height: 560px)','(prefers-reduced-motion: reduce)'].map(q=>matchMedia(q));const staticHero=()=>heroGates.some(q=>q.matches);let ready=false,progress=0,animation=0;const panorama=document.createElement("canvas");panorama.width=1000;panorama.height=360;const pc=panorama.getContext("2d");
// Coordinates follow the supplied 2048×1158 preview, independent of image resolution.
const lenses=[{cx:1063,cy:665,path:new Path2D('M 942 515 C 1015 494 1137 499 1199 534 C 1234 553 1244 587 1234 628 L 1199 754 C 1187 799 1154 821 1110 823 L 992 821 C 950 818 929 798 912 760 L 885 686 C 870 648 876 578 894 548 C 906 530 923 521 942 515 Z')},{cx:1550,cy:665,path:new Path2D('M 1418 520 C 1510 492 1643 503 1690 534 C 1726 557 1744 589 1739 627 L 1718 749 C 1711 795 1680 816 1635 821 L 1480 821 C 1434 816 1417 795 1403 756 L 1373 649 C 1363 607 1376 546 1418 520 Z')}];
function draw(p, time=0){
progress=p;if(!ready)return;
const zoom=1+p*.12;
ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,2048,1158);
ctx.translate(1270,660);ctx.scale(zoom,zoom);ctx.translate(-1270,-660);
ctx.drawImage(image,0,0,2048,1158);
ctx.save();const mask=new Path2D();for(const lens of lenses)mask.addPath(lens.path);ctx.clip(mask);
// The same city moves coherently through both windows, independently of the frame.
const driftX=32*Math.sin(time*.42),driftY=8*Math.sin(time*.31);
const z=(1+p*.16)*(1+.018*Math.sin(time*.28));
ctx.translate(1300-p*24+driftX,660+p*10+driftY);ctx.scale(z,z);
ctx.drawImage(panorama,-550,-200,1100,400);ctx.restore();
canvas.dataset.progress=String(p);
}
let target=0,idleTime=0,lastTime=0,visible=true;
function scrollProgress(){const span=journey.offsetHeight-innerHeight;return Math.max(0,Math.min(1,-journey.getBoundingClientRect().top/Math.max(1,span)))}
function stop(){cancelAnimationFrame(animation);animation=0;lastTime=0}
function canAnimate(){return ready&&!staticHero()&&visible&&!document.hidden}
function frame(now){animation=0;if(!canAnimate())return;
const dt=lastTime?Math.min(.05,(now-lastTime)/1000):0;lastTime=now;idleTime+=dt;
progress+=(target-progress)*(1-Math.exp(-dt*9));
if(Math.abs(target-progress)<.0001)progress=target;
draw(progress,idleTime);animation=requestAnimationFrame(frame)}
function start(){if(canAnimate()&&!animation)animation=requestAnimationFrame(frame)}
function applyMode(){stop();target=scrollProgress();if(ready)draw(staticHero()?1:target,idleTime);start()}
addEventListener('scroll',()=>{target=scrollProgress();start()},{passive:true});
addEventListener('resize',()=>{target=scrollProgress();start()},{passive:true});
heroGates.forEach(q=>q.addEventListener('change',applyMode));
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){target=scrollProgress();start()}else stop()},{threshold:0}).observe(journey);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else start()});
image.onload=()=>{const sx=image.naturalWidth/2048,sy=image.naturalHeight/1158;
pc.drawImage(image,935*sx,540*sy,250*sx,245*sy,0,0,500,360);
pc.drawImage(image,1435*sx,540*sy,260*sx,245*sy,500,0,500,360);
ready=true;canvas.classList.add('ready');applyMode()};
image.onerror=()=>stop();image.src='assets/hero.webp';
