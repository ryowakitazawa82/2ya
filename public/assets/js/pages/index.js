/*
 * 共通で使用する定数
 */
const fvElem = document.getElementById('fv');
const fvContentsElem = document.getElementById('fv-contents');
const fvBgMovieElem = document.getElementById('fv-bg-movie');
const fvBgMaskElem = document.getElementById('fv-bg-mask');
const bciElem = document.getElementById('bci');

/**
 * DOMの読み込みが完了したら実行
 */
document.addEventListener('DOMContentLoaded', () => {
  // スクロール量に応じて処理を実行
  handleBackGround();
  fvContentsElem.style.opacity = 1;
});

/*
 * スクロール量に応じて処理を実行
 */
// headerを表示させるY座標を取得
window.addEventListener('scroll', () => {
  handleBackGround();
});
