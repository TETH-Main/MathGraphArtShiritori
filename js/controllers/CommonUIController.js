/**
 * 共通UI機能を担当するコントローラークラス
 */
class CommonUIController {
    /**
     * CommonUIControllerのコンストラクタ
     */
    constructor() {
        this.initHamburgerMenu();
    }

    /**
     * ハンバーガーメニューの初期化
     */
    initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const nav = document.querySelector('.main-nav');
        const overlay = document.querySelector('.mobile-menu');

        if (hamburger && nav && overlay) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                nav.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });

            overlay.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }
    }

    /**
     * よくある質問のアコーディオンを初期化
     */
    initFaqAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                this.toggleFaq(question);
            });
        });
    }

    /**
     * よくある質問の開閉を切り替える
     * @param {HTMLElement} element - 質問要素
     */
    toggleFaq(element) {
        element.classList.toggle('active');
        const answer = element.nextElementSibling;
        answer.classList.toggle('active');
    }

    /**
     * セクションのローディング表示
     * @param {string} section - セクション名
     * @param {boolean} show - 表示するかどうか
     */
    showSectionLoading(section, show) {
        const loadingElement = document.getElementById(`${section}-loading`);
        const contentElement = document.getElementById(`${section}-${section === 'baton' ? 'container' : section === 'gallery' ? 'nav' : 'grid'}`);

        if (!loadingElement || !contentElement) return;

        if (show) {
            loadingElement.style.display = 'flex';
            contentElement.style.display = 'none';
        } else {
            loadingElement.style.display = 'none';
            contentElement.style.display = section === 'gallery' ? 'grid' : section === 'artists' ? 'grid' : 'flex';
        }
    }
}