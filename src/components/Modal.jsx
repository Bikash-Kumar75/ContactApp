import { createPortal } from 'react-dom';

import { RxCross2 } from "react-icons/rx";
const Modal = ({ onClose, isOpen, children }) => {
    return createPortal(
        <>
            { isOpen && (
                <div className="backdrop-blur z-40 absolute top-0 h-screen w-screen grid items-center">
                    <div className="relative z-50 min-h-[200px] min-w-[80%] bg-white m-auto p-4">
                        <div className="flex justify-end">
                            <RxCross2 onClick={ onClose } className="text-2xl" />
                        </div>
                        { children }
                    </div>
                </div>
            ) }
        </>,
        document.getElementById("modal-root")
    );

};

export default Modal;
