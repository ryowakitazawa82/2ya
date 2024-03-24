/*
 * 共通で使用する定数
 */

/**
 * DOMの読み込みが完了したら実行
 */
document.addEventListener('DOMContentLoaded', () => {
  dateChange();
});

/**
 * 日付をカウントアップする処理
 */
const startDate = new Date(2022, 2, 18); // 月は0から始まるため、3月は2となります。
const endDate = new Date(2024, 2, 27);
const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 日数の差
const interval = 10000 / diffDays; // 10秒を日数で割ったものをインターバルとします。

const dateChange = setInterval(() => {
  startDate.setDate(startDate.getDate() + 1);
  if (startDate >= endDate) {
    clearInterval(dateChange);
  }
  const year = startDate.getFullYear();
  const month = ('0' + (startDate.getMonth() + 1)).slice(-2); // 一桁の場合は0を追加
  const date = ('0' + startDate.getDate()).slice(-2); // 一桁の場合は0を追加
  document.getElementById('date').innerText = `${year}年${month}月${date}日`;
}, interval);

/**
 * 画像の生成を行う処理
 */
const memory = document.getElementById('memory');
const memoryMask = document.querySelector('.memory__mask');
let zIndex = 0;
Array.from({ length: 45 }, (_, i) => i + 1).forEach(i => {
  setTimeout(
    () => {
      const frame = document.createElement('div');
      frame.className = 'memory__frame';
      const image = document.createElement('img');
      image.className = 'memory__image';
      image.src = `./assets/images/memory_${i}.jpg`;

      // ランダムな位置と回転を設定
      const positionX = `${Math.random() * 100}%`;
      const positionY = `${Math.random() * 100}%`;
      const rotate = `${Math.random() * 48 - 24}deg`; // -24度から24度の範囲
      frame.style.position = 'absolute';
      frame.style.left = positionX;
      frame.style.top = positionY;
      frame.style.transform = `translate(-50%, -50%) rotate(${rotate})`;
      frame.style.opacity = '0';
      frame.style.transition = 'opacity 0.5s';

      // z-indexを1ずつ上げる
      zIndex++;
      frame.style.zIndex = zIndex;

      // 指定個数以降の画像はマスクの下に表示
      if (zIndex > 24) {
        memoryMask.style.zIndex = zIndex - 24;
      }

      frame.appendChild(image);
      memory.appendChild(frame);

      // ふわっと表示
      setTimeout(() => (frame.style.opacity = '1'), 10);
    },
    i * (9500 / 45)
  );

  // 全ての処理が完了したらおめでとうの文字を表示
  if (i === 45) {
    setTimeout(() => {
      showCong();
    }, 11000);
  }
});

/**
 * おめでとうの文字を表示する処理
 */
class TextAnimation {
  constructor(el) {
    this.DOM = {};
    this.DOM.el = el instanceof HTMLElement ? el : document.querySelector(el);
    this.chars = this.DOM.el.innerHTML.trim().split('');
    this.DOM.el.innerHTML = this._splitText();
  }
  _splitText() {
    return this.chars.reduce((acc, curr) => {
      curr = curr.replace(/\s+/, '&nbsp;');
      return `${acc}<span class="char">${curr}</span>`;
    }, '');
  }
  animate() {
    this.DOM.el.classList.toggle('inview');
  }
}
class TweenTextAnimation extends TextAnimation {
  constructor(el) {
    super(el);
    this.DOM.chars = this.DOM.el.querySelectorAll('.char');
  }

  animate() {
    this.DOM.el.classList.add('inview');
    this.DOM.chars.forEach((c, i) => {
      TweenMax.to(c, 0.6, {
        ease: Back.easeOut,
        delay: i * 0.05,
        startAt: { x: '-50%', opacity: 0 },
        x: '0%',
        opacity: 1,
      });
    });
  }
}
const cong = document.getElementById('cong');
const congTtl = document.getElementById('cong-ttl');
const ta = new TextAnimation(congTtl);
const showCong = () => {
  cong.classList.add('-show');
  // 2秒遅らせる
  setTimeout(() => {
    ta.animate();
  }, 1000);
};
