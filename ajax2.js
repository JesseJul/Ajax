'use strict';

const form = document.querySelector('#search-form');
const main = document.querySelector('main');

form.addEventListener('submit', async(evt)=>{
  evt.preventDefault();
  try {
  const hakusana = document.querySelector('input[name=search-field]').value;
  const vastaus = await fetch('http://api.tvmaze.com/search/shows?q=' + hakusana);
  const sarjat = await vastaus.json();
  console.log(sarjat);
  sarjat.forEach((sarja, index)=>{
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const div = document.createElement('div');

    h2.innerHTML = sarja.show.name;
    figcaption.innerHTML = sarja.show.name;
    p.innerHTML = sarja.show.genres.join(' | ');
    div.innerHTML = sarja.show.summary;

    img.src = sarja.show.image ? sarja.show.image.medium : 'http://placekitten.com/210/295';
    img.alt = sarja.show.name;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    article.appendChild(h2);
    article.appendChild(figure);
    article.appendChild(p);
    article.appendChild(div);

    figure.addEventListener('click', (evt)=>{
      console.log(sarja.show.image.original);
      console.log(evt.currentTarget);
    });

    main.appendChild(article);

    });

    } catch (e) {
      console.error(e.message);
    }
});
/*
let kuva = 'http://placekitten.com/210/295';
if (sarja.show.image !== null) {
  kuva = sarja.show.image.medium;
}
 */

