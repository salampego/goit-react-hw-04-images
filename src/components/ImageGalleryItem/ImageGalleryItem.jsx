import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  largeImageURL,
  showModal,
}) => {
  return (
    <li className={s.ImageGalleryItem} key={id}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => showModal({ largeImageURL, tags })}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
