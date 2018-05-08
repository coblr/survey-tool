export const scrollTo = id => {
  this.el = document.querySelector(id);
  this.iter = 0;
  this.anim = requestAnimationFrame(renderScroll.bind(this));
};

function renderScroll() {
  const clientHeight =
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const scrollHeight =
    document.documentElement.scrollHeight ||
    document.body.scrollHeight;
  const maxScroll = scrollHeight - clientHeight;

  const finalY = this.el.offsetTop;
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollDif = finalY - scrollTop;
  const nextPos = scrollDif * this.iter / 100 + scrollTop;

  window.scrollTo(0, nextPos);

  if (
    scrollTop !== finalY &&
    (scrollTop < maxScroll || scrollDif < 0)
  ) {
    this.iter++;
    requestAnimationFrame(renderScroll.bind(this));
  }
}
