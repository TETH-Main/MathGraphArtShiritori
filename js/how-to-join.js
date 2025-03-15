/**
 * 参加方法ページのアプリケーションクラス
 */
class HowToJoinApp {
    /**
     * HowToJoinAppのコンストラクタ
     */
    constructor() {
        this.uiController = new HowToJoinController();
    }
}

// アプリケーションの起動
document.addEventListener('DOMContentLoaded', () => {
    const app = new HowToJoinApp();
    window.app = app; // グローバルに app インスタンスを公開
});