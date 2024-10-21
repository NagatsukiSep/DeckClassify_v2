import React from 'react';
import Modal from 'react-modal';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="flex justify-center items-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
      ariaHideApp={false}
    >
      <div className="relative">
        <button onClick={onClose} className="absolute top-0 right-0 m-2 bg-white rounded-full w-8 h-8 flex items-center justify-center">
          ✕
        </button>
        <img src={imageUrl} alt="DeckImage" className="max-w-full max-h-full rounded-lg" />
      </div>
    </Modal>
  );
};

export default ImageModal;