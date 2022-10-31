import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateModal = ({ show, setShow, userData, setUserData }) => {
  const handleClosebtn = () => {
    setShow(!show);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    // upload data to the API
    fetch("http://localhost:8000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newData = [...userData, data];
        setUserData(newData);
        console.log(newData);
        setShow(!show);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  return (
    <div>
      <Modal
        show={show}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header onClick={handleClosebtn} closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Please enter customer information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Enter Name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateModal;
