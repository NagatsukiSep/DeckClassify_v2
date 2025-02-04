import React from "react";
import Modal from "react-modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
}) => {
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 m-2 bg-white rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
        <Image
          src={imageUrl}
          alt="DeckImage"
          className="max-w-full max-h-full p-4"
          width={1200}
          height={600}
          layout="intrinsic"
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
