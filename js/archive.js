/**
 * アーカイブページのアプリケーションクラス
 */
class ArchiveApp {
    /**
     * ArchiveAppのコンストラクタ
     */
    constructor() {
        // サービスとコントローラーの初期化
        this.dataService = new DataService();
        this.searchController = new SearchController(this.dataService);
        this.uiController = new UIController(this.dataService);
        this.paginationController = new PaginationController(this.searchController);

        // DOM要素
        this.elements = {
            keywordSearch: document.getElementById('keyword-search'),
            sortSelect: document.getElementById('sort-select'),
            itemsPerPage: document.getElementById('items-per-page')
        };
    }

    /**
     * アプリケーションを初期化
     */
    async init() {
        // イベントリスナーを設定
        this.setupEventListeners();

        // ページネーションを初期化
        this.paginationController.init();

        // データを取得
        this.showLoading(true);
        const success = await this.dataService.fetchData();

        if (success) {
            // 検索を実行
            this.searchController.search();

            // 作品リストを表示
            this.renderCurrentPage();
        } else {
            // エラーメッセージを表示
            this.showError('データの取得に失敗しました。後でもう一度お試しください。');
        }

        this.showLoading(false);
    }

    /**
     * ローディング表示
     * @param {boolean} show - 表示するかどうか
     */
    showLoading(show) {
        let loading = document.getElementById('loading');

        if (!loading) {
            loading = document.createElement('div');
            loading.id = 'loading';
            loading.className = 'loading';
            loading.innerHTML = '<i class="fas fa-spinner"></i>';
            document.body.appendChild(loading);
        }

        if (show) {
            loading.classList.remove('hidden');
        } else {
            loading.classList.add('hidden');
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

    /**
     * イベントリスナーを設定
     */
    setupEventListeners() {
        // キーワード検索
        this.elements.keywordSearch.addEventListener('input', () => {
            const searchParams = this.searchController.getSearchParams();
            searchParams.keyword = this.elements.keywordSearch.value;
            this.searchController.setSearchParams(searchParams);
            this.searchController.search();
            this.renderCurrentPage();
        });

        // ソート機能
        this.elements.sortSelect.addEventListener('change', () => {
            const sortOption = this.elements.sortSelect.value;
            this.searchController.sort(sortOption);
            this.renderCurrentPage();
        });

        // 1ページあたりの表示件数
        this.elements.itemsPerPage.addEventListener('change', () => {
            this.paginationController.changeItemsPerPage({
                target: { value: this.elements.itemsPerPage.value }
            });
            this.renderCurrentPage();
        });
    }

    /**
     * 現在のページの作品を表示
     */
    renderCurrentPage() {
        const filteredArtworks = this.searchController.getFilteredArtworks();
        const startIndex = this.paginationController.getStartIndex();
        const endIndex = this.paginationController.getEndIndex();

        this.uiController.renderArtworkList(filteredArtworks, startIndex, endIndex);
        this.paginationController.updatePagination();
    }
}

// アプリケーションの起動
document.addEventListener('DOMContentLoaded', () => {
    const app = new ArchiveApp();
    window.app = app; // グローバルに app インスタンスを公開
    app.init();
});