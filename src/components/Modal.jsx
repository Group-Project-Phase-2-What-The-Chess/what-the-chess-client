import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";

export default function Modal({ modalName, handleCloseModal, data }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-all">
      <div className="bg-white p-10 rounded w-[500px]">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-black text-xl">{modalName}</h1>
          <button id="close-add-btn" onClick={handleCloseModal}>
            <MdClose className="text-red-500 text-2xl" />
          </button>
        </div>
        <div className="pt-4 max-h-[500px] overflow-y-auto">{data}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  modalName: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  data: PropTypes.element,
};
