'use strict';

const templates = {  // wstawiamy template
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink : Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink : Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),

}

const optArticleSelector = '.post',  // wybieranie po selektorach
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';


  //const opts = {  // funkcja znajdz i zamień, stałe można zapisac w obiektach (obiekty w obiektach)
   // articleSelector: '.post',
    //titleSelector: '.post-title',
    //titleListSelector: '.titles'
  //};
  //document.getElementById('#showAllLinksBtn').addEventListener('click', function() {generateTitleLinks});
  document.querySelector('#showAllLinksBtn').addEventListener('click', function() { generateTitleLinks() });

/* Generating article after click!  */
function titleClickHandler(event){
  event.preventDefault();                          /* provent devault aby nie skrolowalo nam jak w wikipedi do artykulu   */
  const clickedElement = this;                     /* this to klikniety element */
  console.log(event,'Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement', clickedElement);        /* czego odnosze do clickedelement? */

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
  /* brakuje console log? */
}

/* Generating title links! */
function generateTitleLinks(customSelector = ''){   // po co dodalismy customselector ?
  // jeśli nie podano argumentu, to customSelector będzie miał wartość '', czyli pustego ciągu znaków.
  /* remove contents of titleList */
  // usuń zawartość listy linków w lewej kolumnie,


  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';
  console.log(titleList);


  /* for each article */
  // następnie dla każdego artykułu:

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  // console.log ?

  let html = '';   // dlaczego ?

  for (let article of articles){

    /* get the article id */
    // o	odczytaj jego id i zapisz je do stałej,
    const articleId = article.getAttribute('id');     // co tu robi article?
    console.log(articleId);

    /* find the title element */
    // 	znajdź element z tytułem i zapisz jego zawartość do stałej,

    const articleTitle = article.querySelector(optTitleSelector).innerHTML; // co robi article i innerHTML?
    console.log (articleTitle);
    /* get the title from the title element */

    /* create HTML of the link */
    //	na podstawie tych informacji stwórz kod HTML linka i zapisz go do stałej,

    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);
    // wykorzystanie szablonu/ template i zmiana generowania linków do HTML
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    // o	wstaw stworzony kod HTML do listy linków w lewej kolumnie.

    titleList.insertAdjacentHTML('beforeend', linkHTML);     // co tu sie dzieje ?
    html = html + linkHTML;                                  // co tu sie dzieje ?
    console.log(html);

    // titleList.innerHTML = html;

    // html = html + linkHTML;     // co tu sie stało ?
    //titleList.innerHTML = titleList.innerHTML + linkHTML;  // dziala co robi innerHTML co tu sie dzieje ?
    //console.log(html);

  }

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}
generateTitleLinks();



// znalezenie ilosci wystepowania tagow
function calculateTagsParams(tags){  // params od parameters, podobnie jak "opts" dla options czy "elem" dla elements

  const params = {max: '0', min: '99999'};

  for (let tag in tags){   // in bo szukamy w obiekcie
    console.log(tag + ' is used ' + tags[tag] + ' times');   // tags[tag] ?
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
// kalkulowanie klas po ilosci występowania
function calculateTagClass(count, params){

  const normalizedCount = count - params.min;   // count ?
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  console.log (classNumber);

  return optCloudClassPrefix, classNumber;   // dlaczego prefix przy optCloudClass ?

}

// generowanie tagów
function generateTags(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log (tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');  // odczytanie tagów z atrybutu data-tags naszego artykułu
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');  // zmienia się tylko nazwa – zamiast kolekcji elementów, mamy do czynienia z tablicą.
    console.log(articleTagsArray);


    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);                     // Zauważ, że spacje, które znajdowały się pomiędzy tagami, zostały usunięte. Zajęła się tym funkcja split.

      /* generate HTML of the link */
      //const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li>';
      //console.log(linkHTML);
      //generujemy link poprzez templates
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);   // tu co sie dzieje dokładnie ?

  /* END LOOP: for every article: */
  }

  const tags = document.querySelectorAll('.post-tags .list li a');      // co tu sie dzieje juz po funkcji generatetags?

  for (let tag of tags){
    tag.addEventListener('click', tagClickHandler);       // tagclickhandler ?
  }
}
generateTags();


// Funkcja po kliknięciu w tag
function tagClickHandler(event){

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(event);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');            // co sie dzieje ?
  // funkcja replace otrzymuje dwa argumenty – szukaną frazę oraz ciąg znaków, którym ma ją zastąpić.

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');  // do obgadania, co tu sie dzieje ?
  console.log (tagLinks);
  //  użyliśmy łącznika ^=, który oznacza "atrybut href zaczynający się od "#tag-"". Dzięki temu nie potrzebujemy dodawać klasy do naszych linków!

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {

    /* remove class active */
    tagLink.classList.remove('active');  // classlist ?

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');   // argument ('a[href="' + href + '"]'); ??

  /* START LOOP: for each found tag link */
  for (let hrefTagLink of hrefTagLinks) {

    /* add class active */
    hrefTagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');  // co tu sie dzieje argument ?
  // łącznik ~=, który możemy odczytać jako "znajdź elementy, które mają atrybut data-tags, który ma w sobie słowo 'tag'".
}

function addClickListenersToTags(){
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('.post-tags .list a');
  console.log(tagLinks);

  /* START LOOP: for each link */
  for(let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
  }
}
addClickListenersToTags();


// funkcja generate authors
function generateAuthors(){

  /* Tworze obiekt który będzie przechowywał wszystkich autorów i podpisuję to pod stałą  */
  let allAuthors = {};
  console.log(allAuthors);

  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  // for every article find author
  for (let article of articles) {

    /* znajduje wrapper w html an autorów   */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log (authorsWrapper);

    /* przygotowanie zmiennej HTML  */
    let html = '';

    // get authors from data=authors
    const articleAuthor = article.getAttribute('data-author');

    // generate html link for author  for example <p class="post-author">by Marion Berry</p>
    //const linkHTML = '<a href="#author-' + articleAuthor + '"> by ' + articleAuthor + '</a>';
    // generujemy link pod template template-author-link
    const linkHTMLData = {author: articleAuthor, author: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);

    if(!allAuthors[articleAuthor]) {       // DO PRZEGADANIA CAŁE IF ELSE
      allAuthors[articleAuthor] = 1;
    } else {
    allAuthors[articleAuthor]++;
    }

    // add generated code to html variable
    html = html + linkHTML;
    console.log(html);

    // insert html link into wrapper
    authorsWrapper.insertAdjacentHTML('beforeend', html);
    console.log(allAuthors);
  }

  // dodawanie autorów do chmury po prawej
  /* pobieram wrapper do autorów z prawego sidebara */
  const authorListSidebar = document.querySelector('.authors');

  // do authors params przypisuje wynik działania funkcji
  const authorsParams = calculateTagsParams(allAuthors);
  console.log('authorParams:', authorsParams);

  //let allTagsHTML = '';
  const allAuthorsData = {authors: []};

  for(let author in allAuthors) {              // DO PRZEGADANIA CAŁE FOR

    /* generate code of a link and add it to allTagsHTML */
    const authorNumber = calculateTagClass(allAuthors[author], authorsParams);
    console.log('authorNumber:', authorNumber);

    //allTagsHTML += '<li><a class="tag-size-'+ authorNumber +' " href ="#author-' + author + '">'+ author + '</a></li> ';

    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateTagClass(allAuthors[author], authorsParams)
    });
  }
  /* add HTML from allTagsHTML to tagList */
  //authorListSidebar.innerHTML = allTagsHTML;

  authorListSidebar.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log(allAuthorsData);

  const authors = document.querySelectorAll('.authors a');

  for (let author of authors) {
    author.addEventListener('click' , authorClickHandler);
  }


}
generateAuthors();

// authorClickHandler wzorujac sie na tagClickHandler, najpierw ta funkcja przed authorclicklisteners?
function authorClickHandler(event){

event.preventDefault();   // prevent default action for this event
const clickedElement = this;  // dlaczego kliked element przypisujemy do this ?
const href = clickedElement.getAttribute('href');// read href from clicked element
console.log(href);
const author = href.replace('#author-', '');  /* make a new constant authoer and extract tag from the "href" constant */
const authorLinks = document.querySelectorAll('a.active[href^="#author-"]'); // find all author links with active class
console.log(authorLinks);
  for (let authorLink of authorLinks) {
  authorLink.classList.remove('active');
  }
const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
console.log(hrefAuthorLinks);
  for (let hrefAuthorLink of hrefAuthorLinks){
    hrefAuthorLink.classList.add('active');
    console.log(hrefAuthorLink);
  }
  generateTitleLinks('[data-author="' + author + '"]');   // co tu wywołuje?

}

// addClickListenersToAuthors wzorujac sie na addClickListenersToTags
function addClickListenersToAuthors (){
  const authorLinks = document.querySelectorAll('.post .post-author a'); // find all links to tags */
  console.log(authorLinks);
  for (let authorLink of authorLinks) {  // for each link add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();

// generowanie chmury tagów po prawej
function generateTagsCloud(){

  // create a new variable allTags with an empty array [] > zmieniamy na nowy object {}*/
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log (tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');  // odczytanie tagów z atrybutu data-tags naszego artykułu
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');  // zmienia się tylko nazwa – zamiast kolekcji elementów, mamy do czynienia z tablicą.
    console.log(articleTagsArray);


    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);                     // Zauważ, że spacje, które znajdowały się pomiędzy tagami, zostały usunięte. Zajęła się tym funkcja split.

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li>';
      console.log(linkHTML);
      // <li><a href="#tag-cat">cat</a></li>

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

       /* [NEW] check if this link is NOT already in allTags */  // do omówienia !
      if(!allTags.hasOwnProperty(tag)){                     // do omówienia !
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      console.log(allTags);

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    //tagsWrapper.insertAdjacentHTML('beforeend', html);   // tu co sie dzieje dokładnie ?

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  console.log(tagList);

  /* [NEW] add html from allTags to tagList */
  // Zamiana listy tagów w chmurę
  // Znalezienie skrajnych liczb wystąpień

  const tagsParams = calculateTagsParams(allTags);   // dlaczego w tym miejscu dajemy stałą do tagparams?
  console.log('tagParams', tagsParams)

  // new create variable for all links HTML code
  // let allTagsHTML = ''; zmieniamy na zmienna pod template
  const allTagsData = {tags: []};

  // start loop for each tag in allTags
  for (let tag in allTags) {
    // GENERATE CODE of a link and add it to alltags html

    // przed stworzeniem linka html - allTagsHTML += tag + ' (' + allTags[tag] + ') ';  - nizej po dodaniu do linka HTML - WAZNE !!!
    //const tagLinkHTML = '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag +'">'+ tag + ' (' + allTags[tag] + ')</a></li>';
    //bez podliczania liczby wyswietlen w linku:
    //const tagLinkHTML = '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag +'">'+ tag + '</a></li>';
    //console.log('tagLinkHTML:', tagLinkHTML);

    //allTagsHTML += tagLinkHTML; zmieniamy na obiekt pod template
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    // allTagsHTML += `<li class="${calculateTagClass(allTags[tag], tagsParams)}"><a href="#tag-${tag}">${tag} (${allTags[tag]})</a></li>`
  } // end loop
  // add html from alltagsHTML to tagList

  // tagList.innerHTML = allTagsHTML; zmienamy pod template
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);


  // co tu sie dzieje juz po funkcji generatetags?
  const tags = document.querySelectorAll('.tags a');

  for (let tag of tags){
    tag.addEventListener('click', tagClickHandler);       // tagclickhandler ?
  }

}

generateTagsCloud();