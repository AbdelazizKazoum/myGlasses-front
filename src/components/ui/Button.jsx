const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
