class ScrollObserver {
    constructor(els, cb, options) {
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
        };
        this.cb = cb;
        this.options = Object.assign(defaultOptions, options);
        this._init();
    }
    _init() {
        const callback = function (entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.cb(entry.target, true);
                    observer.unobserve(entry.target);
                } else {
                    this.cb(entry.target, false);
                }
            });
        };

        const io = new IntersectionObserver(callback.bind(this), this.options);
        this.els.forEach((el) => io.observe(el));
    }

    destory() {
        this.io.disconnect();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cb = function (el, isIntersecting) {
        if (isIntersecting) {
            el.classList.add("inview");
        }
    };
    const so = new ScrollObserver(".animate", cb);
});

const windowSize = window.innerWidth;

// iPhone5のみ強制的にinvewクラスを付与
if (windowSize < 321) {
    document.querySelectorAll(".animate").forEach((e) => {
        e.classList.add("inview");
    });
}
