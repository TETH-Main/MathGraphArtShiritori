/**
 * トップページのアプリケーションクラス
 */
class App {
    /**
     * Appのコンストラクタ
     */
    constructor() {
        // サービスとコントローラーの初期化
        this.dataService = new DataService();
        this.uiController = new UIController(this.dataService);
    }

    /**
     * アプリケーションを初期化
     */
    async init() {
        // データを取得
        const success = await this.dataService.fetchData();

        if (success) {
            // UIを初期化
            this.uiController.initHomeUI();
        } else {
            // エラーメッセージを表示
            this.showError('データの取得に失敗しました。後でもう一度お試しください。');
        }
    }

    /**
     * エラーメッセージを表示
     * @param {string} message - エラーメッセージ
     */
    showError(message) {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `<p class="error-message">${message}</p>`;
        }
    }
}

// アプリケーションの起動
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});