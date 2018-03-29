import React from 'react';

const UploadArtwork = ({uploadedArtworkUrl, rmUploadedArtworkUrl, setArtworkUrl,
  selectedArtworkUrl, uploadArtwork, setUploadedArtworkUrl, styles}) => {
  const refs = {};

  const uploadAndSet = () => uploadArtwork(refs.artworkToUpload.files[0])
    .then(({artwork_url}) => setUploadedArtworkUrl(artwork_url));

  return (
    uploadedArtworkUrl ?
      <a onClick={setArtworkUrl(uploadedArtworkUrl)}>
        <img src={uploadedArtworkUrl} alt='artwork'
          className={selectedArtworkUrl === uploadedArtworkUrl ? styles.selected : ''} />
        {/* <i className={`material-icons`} onClick={rmUploadedArtworkUrl}>close</i> */}
        {selectedArtworkUrl === uploadedArtworkUrl && <i className={styles.selectedIcon}>check_circle</i>}
      </a>
      :
      <div className={styles.uploadArtwork}>
        <div className={styles.empty}>
          <i className='material-icons'>file_upload</i>
          <span>Upload Artwork</span>
          <input
            type='file'
            accept='image/*'
            ref={artworkToUpload => (refs.artworkToUpload = artworkToUpload)}
            onChange={uploadAndSet} />
        </div>
      </div>
  );
};

export default UploadArtwork;
