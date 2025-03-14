/**
 * UI表示と操作を担当するコントローラークラス
 */
class UIController {
    /**
     * UIControllerのコンストラクタ
     * @param {DataService} dataService - データサービス
     */
    constructor(dataService) {
        this.dataService = dataService;
        this.initHamburgerMenu();
    }

    /**
     * ハンバーガーメニューの初期化
     */
    initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const nav = document.querySelector('nav ul');
        const overlay = document.querySelector('.overlay');

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
                const answer = question.nextElementSibling;

                // アクティブ状態を切り替え
                question.classList.toggle('active');
                answer.classList.toggle('active');
            });
        });
    }

    /**
     * トップページのUIを初期化
     */
    initHomeUI() {
        // 現在のバトンと前回のバトンを表示
        this.renderCurrentBaton();
        this.renderPreviousBaton();

        // 過去の作品を表示
        this.renderGallery();

        // 次に続きたいアーティストを表示
        this.renderNextArtists();
    }

    /**
     * 現在のバトンを表示
     */
    renderCurrentBaton() {
        const currentArtwork = this.dataService.getCurrentArtwork();
        if (!currentArtwork) return;

        // 現在のバトンにはアーティスト名と言葉のみを表示
        document.getElementById('current-word').textContent = `「${currentArtwork.word}」`;
        document.getElementById('current-artist-name').textContent = currentArtwork.artist;
        document.getElementById('current-artist-link').href = currentArtwork.artistLink;
    }

    /**
     * 前回のバトンを表示
     */
    renderPreviousBaton() {
        const previousArtwork = this.dataService.getPreviousArtwork();
        if (!previousArtwork) return;

        document.getElementById('previous-artwork').src = previousArtwork.imageUrl;
        document.getElementById('previous-word').textContent = `「${previousArtwork.word}」`;
        document.getElementById('previous-artist-name').textContent = previousArtwork.artist;
        document.getElementById('previous-artist-link').href = previousArtwork.artistLink;
        document.getElementById('previous-date').textContent = DateUtils.formatDate(previousArtwork.date);
    }

    /**
     * 次に続きたいアーティストを表示
     */
    renderNextArtists() {
        const artistsGrid = document.getElementById('artists-grid');
        const artistsLoading = document.getElementById('artists-loading');

        if (!artistsGrid || !artistsLoading) return;

        // ローディング表示
        artistsLoading.style.display = 'flex';
        artistsGrid.style.display = 'none';

        setTimeout(() => {
            const nextArtists = this.dataService.getNextArtists();

            artistsGrid.innerHTML = '';

            nextArtists.forEach(artist => {
                const artistLink = document.createElement('a');
                artistLink.href = artist.getTwitterProfileUrl();
                artistLink.target = '_blank';
                artistLink.rel = 'noopener noreferrer';
                artistLink.className = 'artist-link';

                const avatar = document.createElement('div');
                avatar.className = 'artist-avatar';
                avatar.innerHTML = '<i class="fab fa-twitter"></i>';

                const info = document.createElement('div');
                info.className = 'artist-info';

                const name = document.createElement('p');
                name.className = 'artist-name';
                name.textContent = artist.account.startsWith("@") ? artist.account.slice(1) : artist.account

                const handle = document.createElement('p');
                handle.className = 'artist-handle';
                handle.textContent = artist.account;

                info.appendChild(name);
                info.appendChild(handle);

                artistLink.appendChild(avatar);
                artistLink.appendChild(info);

                artistsGrid.appendChild(artistLink);
            });

            // ローディング非表示
            artistsLoading.style.display = 'none';
            artistsGrid.style.display = 'grid';
        }, 1500); // 1.5秒後に表示（デモ用）
    }

    /**
       * ギャラリーを表示
       */
    renderGallery() {
        const galleryNav = document.getElementById('gallery-nav');
        const galleryLoading = document.getElementById('gallery-loading');

        if (!galleryNav || !galleryLoading) return;

        // ローディング表示
        galleryLoading.style.display = 'flex';
        galleryNav.style.display = 'none';

        setTimeout(() => {
            const pastArtworks = this.dataService.getPastArtworks();

            galleryNav.innerHTML = '';

            pastArtworks.forEach(artwork => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';

                const link = document.createElement('a');
                link.href = artwork.artistLink;
                link.target = '_blank';

                const img = document.createElement('img');
                img.src = artwork.imageUrl;
                img.alt = artwork.word;

                const info = document.createElement('div');
                info.className = 'gallery-item-info';

                const word = document.createElement('div');
                word.className = 'gallery-item-word';
                word.textContent = artwork.word;

                const artist = document.createElement('div');
                artist.textContent = artwork.artist; // @を削除

                info.appendChild(word);
                info.appendChild(artist);

                link.appendChild(img);
                link.appendChild(info);
                galleryItem.appendChild(link);

                galleryNav.appendChild(galleryItem);
            });

            // ローディング非表示
            galleryLoading.style.display = 'none';
            galleryNav.style.display = 'grid';
        }, 1000); // 1秒後に表示（デモ用）
    }

    /**
       * アーカイブページの作品リストを表示
       * @param {Array} artworks - 表示する作品の配列
       * @param {number} startIndex - 開始インデックス
       * @param {number} endIndex - 終了インデックス
       */
    renderArtworkList(artworks, startIndex, endIndex) {
        const artworkList = document.getElementById('artwork-list');
        if (!artworkList) return;

        artworkList.innerHTML = '';

        const artworksToShow = artworks.slice(startIndex, endIndex);

        if (artworksToShow.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = '<p>検索結果がありません。検索条件を変更してください。</p>';
            artworkList.appendChild(noResults);
            return;
        }

        artworksToShow.forEach(artwork => {
            const artworkItem = this.createArtworkItem(artwork);

            // クリックでTwitterポストに飛ぶ
            artworkItem.addEventListener('click', () => {
                window.open(artwork.artistLink, '_blank');
            });

            artworkList.appendChild(artworkItem);
        });
    }

    /**
       * 作品アイテムを作成
       * @param {ArtworkModel} artwork - 作品オブジェクト
       * @returns {HTMLElement} 作品アイテム要素
       */
    createArtworkItem(artwork) {
        const item = document.createElement('div');
        item.className = 'artwork-item';

        const imageDiv = document.createElement('div');
        imageDiv.className = 'artwork-image';

        const img = document.createElement('img');
        img.src = artwork.imageUrl;
        img.alt = artwork.word;

        imageDiv.appendChild(img);

        const details = document.createElement('div');
        details.className = 'artwork-details';

        const word = document.createElement('div');
        word.className = 'artwork-word';
        word.textContent = `「${artwork.word}」`;

        const artist = document.createElement('div');
        artist.className = 'artwork-artist';

        const artistLink = document.createElement('a');
        artistLink.href = artwork.artistLink;
        artistLink.target = '_blank';
        artistLink.textContent = artwork.artist; // @を削除

        artist.appendChild(artistLink);

        const date = document.createElement('div');
        date.className = 'artwork-date';
        date.textContent = DateUtils.formatDate(artwork.date);

        details.appendChild(word);
        details.appendChild(artist);
        details.appendChild(date);

        item.appendChild(imageDiv);
        item.appendChild(details);

        return item;
    }

    /**
       * ローディング表示の切り替え
       * @param {boolean} isLoading - ローディング中かどうか
       */
    toggleLoading(isLoading) {
        const loading = document.getElementById('loading');
        if (!loading) return;

        if (isLoading) {
            loading.classList.remove('hidden');
        } else {
            loading.classList.add('hidden');
        }
    }
}