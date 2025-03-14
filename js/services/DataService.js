/**
 * データ取得と処理を担当するサービスクラス
 */
class DataService {
    /**
     * DataServiceのコンストラクタ
     */
    constructor() {
        this.artworks = [];
        this.artists = [];
        this.currentArtwork = null;
        this.previousArtwork = null;
    }

    /**
     * データを取得
     * @returns {Promise<boolean>} 成功したらtrue、失敗したらfalse
     */
    async fetchData() {
        try {
            // 関数アートしりとりデータを取得
            const artworksResponse = await fetch('https://script.google.com/macros/s/AKfycby1uK606WpIBfn6oxRaALBsUDgL4RO0Z6KYap5H_kaf9P8MCHX8ywfadbW8A53QiLjt4Q/exec?id=1HoxCJ-GdButZZI3-GQEOaJv9ZVMqG6DaioR6Wpr2YeE&name=data');
            const artworksData = await artworksResponse.json();

            // アーティストデータを取得
            const artistsResponse = await fetch('https://script.google.com/macros/s/AKfycby1uK606WpIBfn6oxRaALBsUDgL4RO0Z6KYap5H_kaf9P8MCHX8ywfadbW8A53QiLjt4Q/exec?id=147uJQaQbfr8pTJZf6fuQkx5vgHjTfi1cnPYujyNg2Xs&name=data');
            const artistsData = await artistsResponse.json();

            // データの処理
            this.processArtworksData(artworksData);
            this.processArtistsData(artistsData);

            return true;
        } catch (error) {
            console.error('データの取得に失敗しました:', error);
            return false;
        }
    }

    /**
     * 作品データを処理
     * @param {Array} data - APIから取得した作品データ
     */
    processArtworksData(data) {
        this.artworks = data.map(entry => ArtworkModel.fromSpreadsheetEntry(entry));

        const artworkNum = this.artworks.length;

        // 最新の作品と1つ前の作品を設定
        if (this.artworks.length > 0) {
            this.currentArtwork = this.artworks[artworkNum - 1];

            if (this.artworks.length > 1) {
                this.previousArtwork = this.artworks[artworkNum - 2];
            }
        }
    }

    /**
     * アーティストデータを処理
     * @param {Array} data - APIから取得したアーティストデータ
     */
    processArtistsData(data) {
        this.artists = data
            .map(entry => ArtistModel.fromSpreadsheetEntry(entry))
            .filter(artist => artist.check === 'バトンを受け取りたい');
    }

    /**
     * 現在のバトン保持者の作品を取得
     * @returns {ArtworkModel|null} 現在の作品
     */
    getCurrentArtwork() {
        return this.currentArtwork;
    }

    /**
     * 前回のバトン保持者の作品を取得
     * @returns {ArtworkModel|null} 前回の作品
     */
    getPreviousArtwork() {
        return this.previousArtwork;
    }

    /**
     * 次に続きたいアーティスト一覧を取得
     * @returns {Array} アーティストの配列
     */
    getNextArtists() {
        return this.artists;
    }

    /**
     * 過去の作品を取得（最新の2つを除く）
     * @param {number} limit - 取得する作品の最大数
     * @returns {Array} 作品の配列
     */
    getPastArtworks(limit = 8) {
        return this.artworks.slice(2, 2 + limit);
    }

    /**
     * 検索条件に基づいて作品をフィルタリング
     * @param {Object} searchParams - 検索パラメータ
     * @returns {Array} フィルタリングされた作品の配列
     */
    filterArtworks(searchParams) {
        const { keyword } = searchParams;

        return this.artworks.filter(artwork => {
            // キーワード検索
            const matchesKeyword = !keyword ||
                artwork.word.toLowerCase().includes(keyword.toLowerCase()) ||
                artwork.artist.toLowerCase().includes(keyword.toLowerCase());

            return matchesKeyword;
        });
    }

    /**
     * 作品を指定された条件でソート
     * @param {Array} artworks - ソートする作品の配列
     * @param {string} sortOption - ソートオプション
     * @returns {Array} ソートされた作品の配列
     */
    sortArtworks(artworks, sortOption) {
        const sortedArtworks = [...artworks];

        switch (sortOption) {
            case 'date-desc': // 新しい順
                sortedArtworks.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'date-asc': // 古い順
                sortedArtworks.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
        }

        return sortedArtworks;
    }
}