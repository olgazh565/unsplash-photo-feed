import ClipLoader from 'react-spinners/ClipLoader';

export const Loader = () => {
  const override = {
    display: 'block',
  };

  return (
    <ClipLoader
      color='#cc6633'
      cssOverride={override}
      size={30}
    />
  );
};


