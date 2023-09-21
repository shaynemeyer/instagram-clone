import { useState } from 'react';
import { Dialog } from '@headlessui/react';

type ImageUploadProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

function ImageUpload({ isOpen, setIsOpen }: ImageUploadProps) {
  const [caption, setCaption] = useState('');
  // const [image, setImage] = useState(null);

  const handleChange = () => {
    console.log('handleChange clicked');
  };

  const handleUpload = () => {
    console.log('handleUpload clicked');
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Enter a caption"
              onChange={(event) => setCaption(event.target.value)}
              value={caption}
            />
            <input type="file" id="fileInput" onChange={handleChange} />
            <button className="imageupload_button" onClick={handleUpload}>
              Upload
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ImageUpload;
