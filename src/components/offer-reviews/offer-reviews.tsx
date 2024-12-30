import OfferReviewsItem from '../offer-reviews-item/offer-reviews-item';

type OfferReviewsProps = {
  children?: JSX.Element;
  logged?: true;
};

export default function OfferReviews({
  children,
  logged,
}: OfferReviewsProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">1</span>
      </h2>
      <ul className="reviews__list">
        <OfferReviewsItem />
      </ul>
      {logged && children}
    </section>
  );
}
