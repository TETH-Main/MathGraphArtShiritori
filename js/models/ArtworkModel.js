/**
 * 関数アート作品のモデルクラス
 */
class ArtworkModel {
    /**
     * 作品モデルのコンストラクタ
     * @param {Object} data - 作品データオブジェクト
     */
    constructor(data) {
        this.imageUrl = data.imageUrl || '';
        this.word = data.word || '';
        this.artist = data.artist || '';
        this.date = data.date || '';
        this.artistLink = data.artistLink || '';
    }

    /**
     * スプレッドシートのデータから作品オブジェクトを作成
     * @param {Object} entry - スプレッドシートのエントリ
     * @returns {ArtworkModel} 作品オブジェクト
     */
    static fromSpreadsheetEntry(entry) {
        return new ArtworkModel({
            imageUrl: entry.imageUrl || '',
            word: entry.word || '',
            artist: entry.artist || '',
            date: entry.date || '',
            artistLink: entry.artistLink || ''
        });
    }
}

/**
 * アーティストのモデルクラス
 */
class ArtistModel {
    /**
     * アーティストモデルのコンストラクタ
     * @param {Object} data - アーティストデータオブジェクト
     */
    constructor(data) {
        this.account = data.account || '';
        this.check = data.check || '';
    }

    /**
     * スプレッドシートのデータからアーティストオブジェクトを作成
     * @param {Object} entry - スプレッドシートのエントリ
     * @returns {ArtistModel} アーティストオブジェクト
     */
    static fromSpreadsheetEntry(entry) {
        return new ArtistModel({
            account: entry.account || '',
            check: entry.check || ''
        });
    }

    /**
     * Twitterのプロフィールリンクを取得
     * @returns {string} Twitterのプロフィールリンク
     */
    getTwitterProfileUrl() {
        return `https://twitter.com/${this.account.replace('@', '')}`;
    }
}