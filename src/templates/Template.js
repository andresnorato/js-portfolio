import getData from '../utils/getData.js';
import github from '../assets/images/github.png';
import twitter from '../assets/images/twitter.png';
import instagram from '../assets/images/instagram.png';

const Template = async () => {
  const data = await getData();
  const view = `
    <div class="About">
      <div class="card">
        <div class="card_details">
          <div class="card_photo center circle">
            <img src="${data.picture.large}" alt="${data.name.first}">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="enable-background:new -580 439 577.9 194;"
              xml:space="preserve">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>
          <p class="card_title">Hi, My name is</p>
          <p class="card_value">${data.name.first} ${data.name.last}</p>
        </div>
        <div class="card_userdata">
          <ul>
            <li>${data.email}</li>
            <li>${data.location.country}</li>
          </ul>
        </div>
        <div class="card_social">
          <a href="https://twitter.com/home">
            <img src=${twitter} />
          </a>
          <a href="https://github.com/andresnorato">
            <img src=${github} />
          </a>
          <a href="https://www.instagram.com/andresnorato21/">
            <img src=${instagram} />
          </a>
        </div>
      </div>
    </div>
  `;
  return view;
};

export default Template;