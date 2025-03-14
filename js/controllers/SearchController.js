/**
 * 検索機能を担当するコントローラークラス
 */
class SearchController {
    /**
     * SearchControllerのコンストラクタ
     * @param {DataService} dataService - データサービス
     */
    constructor(dataService) {
        this.dataService = dataService;

        // 検索パラメータ
        this.searchParams = {
            keyword: '',
            sortOption: 'date-desc',
            currentPage: 1,
            itemsPerPage: 10
        };

        // フィルタリングされた作品
        this.filteredArtworks = [];
    }

    /**
     * 検索パラメータを設定
     * @param {Object} params - 検索パラメータ
     */
    setSearchParams(params) {
        Object.assign(this.searchParams, params);
    }

    /**
     * 検索パラメータを取得
     * @returns {Object} 検索パラメータ
     */
    getSearchParams() {
        return { ...this.searchParams };
    }

    /**
     * 検索を実行
     */
    search() {
        // 現在のページを1に戻す
        this.searchParams.currentPage = 1;

        // 作品をフィルタリング
        this.filteredArtworks = this.dataService.filterArtworks(this.searchParams);

        // 作品をソート
        this.filteredArtworks = this.dataService.sortArtworks(
            this.filteredArtworks,
            this.searchParams.sortOption
        );

        return this.filteredArtworks;
    }

    /**
     * 並び替えを実行
     * @param {string} sortOption - ソートオプション
     */
    sort(sortOption) {
        this.searchParams.sortOption = sortOption;

        // 作品をソート
        this.filteredArtworks = this.dataService.sortArtworks(
            this.filteredArtworks,
            this.searchParams.sortOption
        );

        return this.filteredArtworks;
    }

    /**
     * フィルタリングされた作品を取得
     * @returns {Array} フィルタリングされた作品の配列
     */
    getFilteredArtworks() {
        return [...this.filteredArtworks];
    }
}