/**
 * ページネーションを担当するコントローラークラス
 */
class PaginationController {
    /**
     * PaginationControllerのコンストラクタ
     * @param {SearchController} searchController - 検索コントローラー
     */
    constructor(searchController) {
        this.searchController = searchController;

        // DOM要素
        this.elements = {
            prevPage: document.getElementById('prev-page'),
            nextPage: document.getElementById('next-page'),
            currentPage: document.getElementById('current-page'),
            totalPages: document.getElementById('total-pages'),
            itemsPerPage: document.getElementById('items-per-page')
        };
    }

    /**
     * ページネーションを初期化
     */
    init() {
        // イベントリスナーを設定
        this.elements.prevPage.addEventListener('click', () => {
            if (this.prevPage()) {
                const filteredArtworks = this.searchController.getFilteredArtworks();
                const startIndex = this.getStartIndex();
                const endIndex = this.getEndIndex();

                // UIControllerのインスタンスを取得して検索結果を更新
                const uiController = window.app.uiController;
                uiController.renderArtworkList(filteredArtworks, startIndex, endIndex);
                this.updatePagination();
            }
        });

        this.elements.nextPage.addEventListener('click', () => {
            if (this.nextPage()) {
                const filteredArtworks = this.searchController.getFilteredArtworks();
                const startIndex = this.getStartIndex();
                const endIndex = this.getEndIndex();

                // UIControllerのインスタンスを取得して検索結果を更新
                const uiController = window.app.uiController;
                uiController.renderArtworkList(filteredArtworks, startIndex, endIndex);
                this.updatePagination();
            }
        });

        // 初期値を設定
        const searchParams = this.searchController.getSearchParams();
        if (this.elements.itemsPerPage) {
            this.elements.itemsPerPage.value = searchParams.itemsPerPage.toString();
        }
    }

    /**
     * 前のページに移動
     */
    prevPage() {
        const searchParams = this.searchController.getSearchParams();

        if (searchParams.currentPage > 1) {
            searchParams.currentPage--;
            this.searchController.setSearchParams(searchParams);
            return true;
        }

        return false;
    }

    /**
     * 次のページに移動
     */
    nextPage() {
        const searchParams = this.searchController.getSearchParams();
        const filteredArtworks = this.searchController.getFilteredArtworks();
        const totalPages = Math.ceil(filteredArtworks.length / searchParams.itemsPerPage);

        if (searchParams.currentPage < totalPages) {
            searchParams.currentPage++;
            this.searchController.setSearchParams(searchParams);
            return true;
        }

        return false;
    }

    /**
     * 1ページあたりの表示件数を変更
     * @param {Event} event - イベントオブジェクト
     */
    changeItemsPerPage(event) {
        const searchParams = this.searchController.getSearchParams();
        searchParams.itemsPerPage = parseInt(event.target.value);
        searchParams.currentPage = 1;
        this.searchController.setSearchParams(searchParams);
        return true;
    }

    /**
     * ページネーション情報を更新
     */
    updatePagination() {
        const searchParams = this.searchController.getSearchParams();
        const filteredArtworks = this.searchController.getFilteredArtworks();
        const totalPages = Math.ceil(filteredArtworks.length / searchParams.itemsPerPage);

        this.elements.currentPage.textContent = searchParams.currentPage.toString();
        this.elements.totalPages.textContent = totalPages.toString();

        this.elements.prevPage.disabled = searchParams.currentPage <= 1;
        this.elements.nextPage.disabled = searchParams.currentPage >= totalPages;
    }

    /**
     * 現在のページの開始インデックスを取得
     * @returns {number} 開始インデックス
     */
    getStartIndex() {
        const searchParams = this.searchController.getSearchParams();
        return (searchParams.currentPage - 1) * searchParams.itemsPerPage;
    }

    /**
     * 現在のページの終了インデックスを取得
     * @returns {number} 終了インデックス
     */
    getEndIndex() {
        const searchParams = this.searchController.getSearchParams();
        return this.getStartIndex() + searchParams.itemsPerPage;
    }
}