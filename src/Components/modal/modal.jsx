import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import IconButton from "../buttons/ButtonIcon";

function ModalApp(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { children, onBtnClick, leftIcon } = props;
  // console.log(children, onBtnClick, leftIcon);
  return (
    <>
      <IconButton btnClick={handleShow} leftIcon={leftIcon} variant="light" />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              onBtnClick();
              setShow(false);
            }}
            variant="primary"
          >
            ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

Modal.defaultProps = {
  variant: "light",
};

export default ModalApp;
