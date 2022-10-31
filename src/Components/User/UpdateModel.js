import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UpdateModel = ({
  updateShow,
  setUpdateShow,
  userData,
  setUserData,
  specificUser,
  setSpecificUser,
}) => {
  //console.log("specificUser", specificUser);
  const handleClosebtn = () => {
    setUpdateShow(!updateShow);
    setSpecificUser({});
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    // upload data to the API
    fetch(`http://localhost:8000/users/${specificUser[0]?._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          fetch(`http://localhost:8000/users`)
            .then((res) => res.json())
            .then((userInfo) => {
              console.log(userInfo);
              setUserData(userInfo);
              setUpdateShow(!updateShow);
            });
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  return (
    <div>
      <Modal
        show={updateShow}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header onClick={handleClosebtn} closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Update user information.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="name"
                name="name"
                defaultValue={specificUser[0]?.name}
                placeholder="Enter Name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                defaultValue={specificUser[0]?.email}
                placeholder="Enter Email"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateModel;
