export const Md3Button = ({ children, onClick, variant = 'solid', className = '' }) => {
  const styles = {
    solid: 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg',
    outline: 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50',
    text: 'text-indigo-600 hover:bg-indigo-50'
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-full px-8 py-3 font-semibold transition-all duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};