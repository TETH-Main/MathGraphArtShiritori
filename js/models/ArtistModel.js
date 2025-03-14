/**
 * アーティストのモデルクラス
 */
class ArtistModel {
    /**
     * ArtistModelのコンストラクタ
     * @param {Object} data - アーティストデータ
     */
    constructor(data) {
        this.id = data.id || ""
        this.account = data.account || ""
        this.isParticipating = data.isParticipating || false
    }

    /**
     * アーティストデータをJSON形式に変換
     * @returns {Object} JSON形式のアーティストデータ
     */
    toJSON() {
        return {
            id: this.id,
            account: this.account,
            isParticipating: this.isParticipating,
        }
    }

    /**
     * TwitterプロフィールURLを取得
     * @returns {string} TwitterプロフィールURL
     */
    getTwitterProfileUrl() {
        // @記号を削除してURLを生成
        const username = this.account.replace("@", "")
        return `https://twitter.com/${username}`
    }

    /**
     * アーティストが検索キーワードに一致するかチェック
     * @param {string} keyword - 検索キーワード
     * @returns {boolean} 一致する場合はtrue
     */
    matchesKeyword(keyword) {
        if (!keyword) return true

        const lowerKeyword = keyword.toLowerCase()
        return this.account.toLowerCase().includes(lowerKeyword)
    }
}

// グローバルスコープで利用できるようにする
if (typeof window !== "undefined") {
    window.ArtistModel = ArtistModel
}

