/** @format */

const Heading = ({ text, subtext, styles }) => {
  return (
    <div className={styles}>
      {text && <h1 className='font-bold text-4xl'>{text}</h1>}
      {subtext && <p className=''>{subtext}</p>}
    </div>
  );
};

export default Heading;
