import React, { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import ContactItem from "./ContactItem";
import { useSelector } from "react-redux";

const ContactList = () => {
  const { contactList } = useSelector((state) => state);

  return (
    <div>
      <SearchBox />
      {console.log("contactList", contactList)}
      {/* ContactList -> ContactItem 부모에서 자식으로 갈때는 props가 더 간편 */}
      {contactList.map((item) => (
        <ContactItem item={item} />
      ))}
    </div>
  );
};

export default ContactList;
