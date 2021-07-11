import { useRef } from "react"

const Modal = ({ data, visible, close }) => {
    const modalBack = useRef()

    const { header, content: Content, buttons } = data

    const modalBackClickHandler = (e) => {
        e.stopPropagation()
        if (e.target === modalBack.current) {
            close()
        }
    }

    return (
        <div className={`modal ${visible ? 'open' : ''}`} ref={modalBack} onClick={modalBackClickHandler}>
            <div className="modal__body">
                <div className="modal__header">
                    <h2 className="title">
                        {header}
                    </h2>
                    <span className="modal__closer" onClick={close}>
                        <strong>&times;</strong>
                    </span>
                </div>

                <div className="modal__content">
                    <Content />
                </div>

                <div className="modal__footer">
                    {buttons.map(btn =>
                        <button className={btn.classList.join(' ')} key={btn.id} onClick={btn.onClick}>Close</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;