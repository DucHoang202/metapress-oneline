interface DemoButtonProps {
  href: string;
  text: string;
}

const DemoButton: React.FC<DemoButtonProps> = ({ href, text }) => {
  // const black = (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     width="12"
  //     height="12"
  //     viewBox="0 0 12 12"
  //     fill="none"
  //   >
  //     <path
  //       d="M1 11L11 1M11 1H3.5M11 1V8.5"
  //       stroke="#0E0A0F"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     />
  //   </svg>
  // );

  const white = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3 13L13 3M13 3H5.5M13 3V10.5"
        stroke="#FCF5FE"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <a className="demo-btn" href={href}>
      <div className="text">{text}</div>
      <span className="icon-container">{white}</span>
    </a>
  );
};

export default DemoButton;
