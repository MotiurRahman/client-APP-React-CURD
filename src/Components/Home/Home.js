import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useLoaderData } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import CreateModal from "../User/CreateModal";
import UpdateModel from "../User/UpdateModel";

const Home = () => {
  const users = useLoaderData();
  const [userData, setUserData] = useState(users);
  const [specificUser, setSpecificUser] = useState({});

  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);

  const handleCreateUser = () => {
    setShow(!show);
  };

  const handleDeleteUser = (userID) => {
    fetch(`http://localhost:8000/users/${userID}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        const remaining = userData.filter((user) => user._id !== userID);
        setUserData(remaining);
        console.log(data);
      });
  };
  const handleUpdateUser = (userID) => {
    fetch(`http://localhost:8000/users/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setSpecificUser(data);
      });
    setUpdateShow(!updateShow);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-center my-5">User Details Info</h3>
        <CreateModal
          show={show}
          setShow={setShow}
          setUserData={setUserData}
          userData={userData}
        ></CreateModal>
        <Button
          onClick={handleCreateUser}
          style={{ height: "50px" }}
          variant="dark"
        >
          Create New User
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => {
            return (
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <FaTrashAlt
                    onClick={() => handleDeleteUser(user._id)}
                    style={{ cursor: "pointer" }}
                    className="mx-2"
                  ></FaTrashAlt>
                  <FaRegEdit
                    onClick={() => handleUpdateUser(user._id)}
                    style={{ cursor: "pointer" }}
                    className="mx-2"
                  ></FaRegEdit>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <UpdateModel
        updateShow={updateShow}
        userData={userData}
        setUserData={setUserData}
        specificUser={specificUser}
        setSpecificUser={setSpecificUser}
        setUpdateShow={setUpdateShow}
      ></UpdateModel>
    </div>
  );
};

export default Home;
