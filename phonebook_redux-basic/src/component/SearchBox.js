import React, { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const SearchBox = () => {
  return (
    <Form>
      {/* Row 1행 */}
      <Row>
        {/* Col 2열 (Col은 반반으로 나눌때 사용)*/}
        {/* 10 대 2 비율 */}
        <Col lg={10}>
          <Form.Control type="text" placeholder="이름을 입력해주세요" />
        </Col>
        <Col lg={2}>
          <Button type="submit">찾기</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
