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

      const html = `<article>
                    <h2>${sarja.show.name}</h2>
                    <a href="${sarja.show.officialSite || sarja.show.url}">Link to homepage</a>
                    <figure data-id="${index}">
                         <img src="${sarja.show.image ? sarja.show.image.medium : 
          'http://placekitten.com/210/295'}" alt="${sarja.show.name}">
                         <figcaption>${sarja.show.name}</figcaption>
                </figure>
                <p>Genres: ${sarja.show.genres.join(' | ')}</p>
                ${sarja.show.summary}
             </article>`;
      main.innerHTML += html;
    });

  const figuret = document.querySelectorAll('figure');
  figuret.forEach((figure, index)=>{
    figure.addEventListener('click', ()=> {
      const id = figure.dataset.id;
      console.log(sarjat[sarjat[id].show.image.original]);
    })
  })

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

