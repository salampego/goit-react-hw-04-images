import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

export function ImageGallery({ imageGallery }) {
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  const openModal = ({ largeImageURL, tags }) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
    setTags('');
  };

  return (
    <>
      <ul className={s.ImageGallery}>
        {imageGallery.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              showModal={openModal}
            />
          );
        })}
      </ul>
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

// export class ImageGallery extends Component {
//   state = {
//     showModal: false,
//     largeImageURL: '',
//     tags: '',
//   };

// showModal = ({ largeImageURL, tags }) => {
//   this.setState({
//     showModal: true,
//     largeImageURL: largeImageURL,
//     tags: tags,
//   });
// };

// closeModal = () => {
//   this.setState({
//     showModal: false,
//     largeImageURL: '',
//     tags: '',
//   });
// };
//   render() {
//     const imageGallery = this.props.imageGallery;
//     const { showModal } = this.state;
//     return (
//       <>
//         <ul className={s.ImageGallery}>
//           {imageGallery.map(data => {
//             const { id, webformatURL, largeImageURL, tags } = data;
//             return (
//               <ImageGalleryItem
//                 key={id}
//                 id={id}
//                 webformatURL={webformatURL}
//                 largeImageURL={largeImageURL}
//                 tags={tags}
//                 showModal={this.showModal}
//               />
//             );
//           })}
//         </ul>
//         {showModal && (
//           <Modal
//             largeImageURL={this.state.largeImageURL}
//             tags={this.state.tags}
//             closeModal={this.closeModal}
//           />
//         )}
//       </>
//     );
//   }
// }

ImageGallery.propTypes = {
  imageGallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
