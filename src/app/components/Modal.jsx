const Modal = ({ open, children }) => {
  return (
    /* backdrop */
    <div
      className={` fixed inset-0 z-[1000] flex justify-center items-center transition-colors ${
        open ? "visible bg-black/50" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        className={`bg-white dark:bg-[#25273d] transition-all rounded-md shadow-md flex flex-col justify-center min-w-80 min-h-40 py-6 px-8 ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
