import { FullOfferData } from '../../types';

export default function OfferPresentation({
  title,
  type,
  price,
  rating,
  isPremium,
  isFavorite,
  bedrooms,
  maxAdults,
}: FullOfferData): JSX.Element {
  return (
    <>
      {isPremium && (
        <div className="offer__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="offer__name-wrapper">
        <h1 className="offer__name">{title}</h1>
        <button
          className={`offer__bookmark-button ${
            isFavorite ? 'offer__bookmark-button--active' : ''
          } button`}
          type="button"
        >
          <svg className="offer__bookmark-icon" width={31} height={33}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{ width: `${(100 / 5) * Math.round(rating)}%` }} />
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">{rating}</span>
      </div>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">{type}</li>
        <li className="offer__feature offer__feature--bedrooms">{`${bedrooms} Bedrooms`}</li>
        <li className="offer__feature offer__feature--adults">
          {`Max ${maxAdults} ${maxAdults === 1 ? 'adult' : 'adults'}`}
        </li>
      </ul>
      <div className="offer__price">
        <b className="offer__price-value">&euro;{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
    </>
  );
}
