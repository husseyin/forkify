// ICONS
import icons from 'url:../../img/icons.svg';
// PAGES
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const currPage = this._data.page;

    // Page 1 and there are other pages -START
    if (currPage === 1 && numPage > 1)
      return this._generateMarkupNext(currPage);
    // Page 1 and there are other pages -END

    // Last page -START
    if (currPage === numPage && numPage > 1)
      return this._generateMarkupPrev(currPage);
    // Last page -END

    // Other page -START
    if (currPage > 1 && currPage < numPage)
      return `
        ${this._generateMarkupNext(currPage)}
        ${this._generateMarkupPrev(currPage)}
    `;
    // Other page -END

    // Page 1 and there are NO other pages -START
    //  if (currPage === 1 && numPage === 1) return '';
    return '';
    // Page 1 and there are NO other pages -END
  }

  _generateMarkupNext(currPage) {
    return `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }

  _generateMarkupPrev(currPage) {
    return `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
            <span>Page ${currPage - 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
        </button>
    `;
  }
}

export default new PaginationView();
