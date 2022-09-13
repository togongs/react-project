import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ContactItem = ({ item }) => {
  const { contactList } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    setNickname(item.name);
    setNumber(item.phoneNumber);
  }, [item]);

  const delContact = () => {
    console.log("click delete");
    dispatch({
      type: "DELETE_CONTACT",
      payload: item.name,
    });
  };

  const editContact = () => {
    console.log("click edit btn");
    dispatch({
      type: "EDIT_CONTACT",
      payload: { name: nickname, phoneNumber: number },
    });
  };

  const nickChange = (event) => {
    setNickname(event.target.value);
  };
  const numChange = (event) => {
    setNumber(event.target.value);
  };

  return (
    <Row>
      <Col lg={2}>
        <Link to="/edit">
          <img
            width={70}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
            alt=""
          />
        </Link>
      </Col>
      <Col lg={10}>
        <div>
          <input value={nickname} onChange={nickChange} />
          <input value={number} onChange={numChange} />
        </div>
        <Button onClick={delContact}>삭제</Button>
        <Button onClick={editContact}>수정</Button>
      </Col>
    </Row>
  );
};

export default ContactItem;
