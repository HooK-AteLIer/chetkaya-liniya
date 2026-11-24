(() => {
  const finder = document.querySelector('.location-finder');
  if (!finder) return;
  const places = {
    'osetinskaya': { title: 'Осетинская, 16', note: 'Самара. Волгарь, около Софийской площади.', src: 'https://yandex.ru/map-widget/v1/?mode=search&text=' + encodeURIComponent('Самара, Осетинская улица, 16') + '&z=16' },
    'kuybysheva': { title: 'Куйбышева, 84', note: 'Самара, улица Куйбышева, 84.', src: 'https://yandex.ru/map-widget/v1/?mode=search&text=' + encodeURIComponent('Самара, улица Куйбышева, 84') + '&z=16' },
    'novo-sadovaya': { title: 'Ново-Садовая, 164', note: 'Самара, Ново-Садовая улица, 164.', src: 'https://yandex.ru/map-widget/v1/?oid=57505321973&ol=biz&z=16' }
  };
  const links = [...finder.querySelectorAll('[data-map-location]')];
  const stage = finder.querySelector('.location-map-stage');
  const placeholder = finder.querySelector('.location-placeholder');
  const title = finder.querySelector('.location-selected');
  const description = finder.querySelector('.location-map-description');
  const status = finder.querySelector('.location-status');
  const route = finder.querySelector('.location-route');
  const load = finder.querySelector('.location-load');
  let selected = links.find(link => link.hasAttribute('aria-current')) || links[0];
  let frame;

  function updateFrame() {
    const place = places[selected.dataset.mapLocation];
    frame.title = 'Яндекс Карта: Самара, ' + place.title;
    frame.src = place.src;
  }

  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (selected === link) return;
    selected = link;
    links.forEach(item => {
      if (item === link) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });
    const place = places[link.dataset.mapLocation];
    title.textContent = place.title;
    description.textContent = place.note;
    status.textContent = 'На карте: ' + place.title;
    route.href = link.href;
    if (frame) updateFrame();
  }));

  load.hidden = false;
  load.addEventListener('click', () => {
    if (frame) return;
    frame = document.createElement('iframe');
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    frame.allowFullscreen = true;
    updateFrame();
    stage.append(frame);
    placeholder.hidden = true;
    frame.focus();
  });
})();
