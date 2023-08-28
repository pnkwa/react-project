const carousel = document.querySelector('.container--animeRow--anime--list');
const scrollLeftBtn = document.querySelector('.fa-solid.fa-angle-left');
const scrollRightBtn = document.querySelector('.fa-solid.fa-angle-right');

const imagesPerScroll = 6; 
const itemWidth = 300; 

scrollLeftBtn.addEventListener('click', () => {
  console.log('left');
  const currentScroll = carousel.scrollLeft;
  carousel.scrollTo({
    left: currentScroll - imagesPerScroll * itemWidth,
    behavior: 'smooth',
  });
});

scrollRightBtn.addEventListener('click', () => {
  console.log('right');
  const currentScroll = carousel.scrollLeft;
  carousel.scrollTo({
    left: currentScroll + imagesPerScroll * itemWidth,
    behavior: 'smooth',
  });
});
