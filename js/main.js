const searchText = document.getElementById('search-text');
const result = document.getElementById('resultado');

function debounce(fx) {
    let timeId;
    console.log(`entre al bounce y tiene este valor ${timeId}`);

    return function() {
        if (timeId) {
            clearTimeout(timeId);
            console.log("entre al time");
        }
        const context = this;
        const args = arguments;

        timeId = setTimeout(() => {
            fx.apply(context, args)
        }, 2000)
    }
}


let epoint = 'http://www.omdbapi.com/?'; //i=tt3896198&;
let apikey = 'apikey=c8d257dc';

//FETCH POST
const searchPelis = async (peli) => {
  const res = await fetch(
    `${epoint}s=${peli}&${apikey}`
  );
  const data = await res.json();
  //return data; 
  const value = data.Search || []
  showData(value);
};

const searchPelisBounce = debounce(searchPelis)

const showData = (data) => {
    if(data.length === 0) {
        result.innerHTML = "No hay nada"
        return
    }
result.innerHTML = `<ul>
${data
    .map(
        (film) => 
        `<li>${film.Title}</li>`
    )
    .join('')}
    </ul>`;
}

function init(){

    searchText.addEventListener('input', (e) => {
        e.preventDefault();
        const searchValue = e.target.value.trim();
        if (!searchValue) {
          return;
        }
          //searchPelis(searchValue);
          searchPelisBounce(searchValue);
         
      });
};



init();
