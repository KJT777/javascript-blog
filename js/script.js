'use strict';

const templates = {  
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink : Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink : Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),

}

const optArticleSelector = '.post',  // selektory
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

/* Generating article after click!  */
function titleClickHandler(event){
  event.preventDefault();                          
  const clickedElement = this;                     
  console.log(event,'Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement', clickedElement);        

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
}

/* Generating title links! */
function generateTitleLinks(customSelector = ''){ 
  //const opts = {  
// articleSelector: '.post',
  //titleSelector: '.post-title',
  //titleListSelector: '.titles'
  //};
  
  /*remove contents of titlelist*/
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';
  console.log(titleList);


  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';   

  for (let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');     
    console.log(articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; 
    console.log (articleTitle);
    /* get the title from the title element */

    /* create HTML of the link */
    //stwórz kod HTML linka i zapisz go do stałej,

    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);     
    html = html + linkHTML;                                  
    console.log(html);

    // lub titleList.innerHTML = html;
    // html = html + linkHTML;     
    //titleList.innerHTML = titleList.innerHTML + linkHTML;  
    //console.log(html);

  }

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}
generateTitleLinks();
const links = document.querySelectorAll('.titles a');
console.log(links);
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
/*obliczanie parametrów*/
function calculateTagsParams(tags){
  const params = {
    max: '0',
    min: '999999'
  };
  for(let tag in tags){
 console.log(tag + ' is used ' + tags[tag] + ' times ');
    
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
};
return params;
}
/*obliczanie parametrów autorów*/
function calculateAuthorsParams(authors){
const params = {
  max: '0',
  min: '999999'
};
for(let author in authors){
console.log(author + ' is used ' + authors[author] + ' times ');
  
 if (authors[author] > params.max) {
    params.max = authors[author];
 }
  if (authors[author] < params.min) {
    params.min = authors[author];
  }
}  
  return params;
}
// kalkulowanie klas po ilosci występowania
function calculateTagClass(count, params){

  const normalizedCount = count - params.min;   
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  console.log (classNumber);
  const classValue = opt.cloudClassPrefix + classNumber;
  return classValue;
}
// generowanie tagów
function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
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
    const articleTags = article.getAttribute('data-tags');  
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' '); 
    console.log(articleTagsArray);


    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);                     

      /* generate HTML of the link */
      //const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li>';
      //console.log(linkHTML);
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);
  } 
     /* [NEW] check if this link is NOT already in allTags */
     if(!allTags[tag]) {
     /* [NEW] add tag to allTags object */
    allTags[tag] = 1;
  } else {
    allTags[tag]++;
  }
  }
  //W warunku użyliśmy wykrzyknika (!), czyli zastosowaliśmy negację. Dlatego warunek czytamy jako "jeśli allTags NIE MA klucza tag".Jeśli natomiast ten tag już znajduje się w allTags, zwiększymy licznik wystąpień o 1. Dopiszemy więc blok else://
    }
    /* END LOOP: for each tag */
  }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);   // czy tagsWrapper.innerHTML = html;?

  /* END LOOP: for every article: */
  
  const tags = document.querySelectorAll('.post-tags .list li a');      
  for (let tag of tags){
    tag.addEventListener('click', tagClickHandler);       
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
  allTagsHTML += tag + ' (' + allTags[tag] + ') ';
}
/* [NEW] END LOOP: for each tag in allTags: */

/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;

generateTags();

// Funkcja po kliknięciu w tag
function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(event);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');            

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');  
  console.log (tagLinks);
  

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {

    /* remove class active */
    tagLink.classList.remove('active');  

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a.active[href="' + href + '"]');   

  /* START LOOP: for each found tag link */
  for (let hrefTagLink of hrefTagLinks) {

    /* add class active */
    hrefTagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');  
}

  function addClickListenersToTags(){
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('.post-tags .list a');/*czy const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log(tagLinks);

  /* START LOOP: for each link */
  for(let tagLink of tagLinks) {
      
    /* add tagClickHandler as event listener for that link */
    
    tagLink.addEventListener('click', tagClickHandler);
   /* END LOOP: for each link */
  }
}
addClickListenersToTags();

// funkcja generating authors
function generateAuthors(){
   
    /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = {};
  console.log(allAuthors);

  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log (authorsWrapper);

    let html = '';

    /*get authors from data=authors attribute*/
    const articleAuthor = article.getAttribute('data-author');

    /*generate html of the link*/
    //const linkHTML = '<a href="#author-' + articleAuthor + '"> by ' + articleAuthor + '</a>';
    // czy tak://const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
    const linkHTMLData = {author: articleAuthor, author: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);

    /* check if author is not already on the list */
    if(!allAuthors.hasOwnProperty(author)){
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
    }
    /* insert HTML of all the links into the authors wrapper */
  
    authorWrapper.insertAdjacentHTML('beforeend', linkHTML);
    console.log(allAuthors);

    // add generated code to html variable
    html = html + linkHTML;
    console.log(html);
  }
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
  const authorListSidebar = document.querySelector('.authors');
  const authorsParams = calculateTagsParams(allAuthors);
  console.log('authorParams:', authorsParams);

  //let allTagsHTML = '';
  const allAuthorsData = {authors: []};
  for(let author in allAuthors) {              

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

function authorClickHandler(event){
    
    /* prevent default action for this event*/
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant 'author' and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
     /* find all author links with class active */ 
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]'); 
    console.log(authorLinks);
    /* START LOOP: for each active author link */
    for (let authorLink of authorLinks){
    /* remove class active */
    authorLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
      
    /* START LOOP: for each found author link */
    for(let hrefAuthorLink of hrefAuthorLinks){
    /* add class active */
    hrefAuthorLink.classList.add('active');
    /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
      generateTitleLinks('[data-author="' + author + '"]');
    }
    const addClickListenersToAuthors = function () {
      /* find all links to authors */
}
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');//lub const authorLinks = document.querySelectorAl('.post .post-author a');//
    console.log(authorLinks); 
      /* START LOOP: for each link */
    for (let authorLink of authorLinks) {
      /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
  }
  addClickListenersToAuthors();