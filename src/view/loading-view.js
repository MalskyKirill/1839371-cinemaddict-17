import AbstractView from '../framework/view/abstract-view';

const createNoTaskTemplate = () => (
  `<p class="films-list__title">
    Loading...
  </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoTaskTemplate();
  }
}

