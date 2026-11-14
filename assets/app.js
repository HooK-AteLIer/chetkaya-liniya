const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);nav.classList.toggle('open',open)};nav.querySelectorAll('a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')});const descriptions={'Оправы':'Примерьте оправу в салоне, чтобы оценить форму и посадку. Позвоните, чтобы уточнить ассортимент.','Готовые очки':'Уточните доступные варианты готовых очков по телефону, затем приходите в салон.','Контактные линзы':'Позвоните, чтобы уточнить наличие нужных контактных линз и их параметров.','Солнцезащитные очки':'Посмотрите солнцезащитные очки в салоне. Наличие моделей уточняйте по телефону.','Аксессуары':'Футляры и другие аксессуары для ваших очков. Уточните ассортимент в салоне.'};
const choiceButtons = document.querySelectorAll('.choices button');
const galleryLinks = document.querySelectorAll('.choice-gallery');
const folders = document.querySelectorAll('.catalog-folder');
function selectChoice(button) {
  const category = button.textContent.trim();
  choiceButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#choice-title').textContent = category;
  document.querySelector('#choice-description').textContent = descriptions[category];
  galleryLinks.forEach(link => { link.hidden = link.dataset.choice !== category; });
}
choiceButtons.forEach(button => { button.onclick = () => selectChoice(button); });
selectChoice(document.querySelector('.choices button[aria-pressed="true"]'));

document.querySelectorAll('#assortment a[href="#choose"]').forEach((link,index)=>link.addEventListener('click',()=>selectChoice(choiceButtons[index+folders.length])));

function openLinkedFolder() {
  folders.forEach(folder => {
    if (location.hash === '#' + folder.id) folder.open = true;
  });
}
galleryLinks.forEach(link => link.querySelector('a').addEventListener('click', event => {
  const folder = document.getElementById(event.currentTarget.hash.slice(1));
  folder.open = true;
}));
window.addEventListener('hashchange', openLinkedFolder);
openLinkedFolder();

const reveals=[...document.querySelectorAll(".section .eyebrow,.section h2,.heading p,.catalog,.stellest-grid,.steps,.choices,.answer,details,.address")];const rm=matchMedia("(prefers-reduced-motion: reduce)");const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.08});reveals.forEach(e=>{e.classList.add("reveal");observer.observe(e)});function revealMode(){document.body.classList.toggle("motion-reveal",!rm.matches);if(rm.matches)reveals.forEach(e=>e.classList.add("in"))}rm.addEventListener("change",revealMode);revealMode();
