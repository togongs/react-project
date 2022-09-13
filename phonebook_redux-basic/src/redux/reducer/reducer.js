let initialState = {
  contactList: [],
  // keyword: "",
};

function reducer(state = initialState, action) {
  console.log("action", action);
  // let { type, payload } = action;
  switch (action.type) {
    case "ADD_CONTACT":
      return {
        ...state,
        contactList: [
          ...state.contactList,
          {
            name: action.payload.name,
            phoneNumber: action.payload.phoneNumber,
          },
        ],
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contactList: state.contactList.filter(
          (item) =>
            // console.log("index: ", index)
            item.name !== action.payload
        ),
      };

    // case "EDIT_CONTACT":
    //   return {
    //     ...state,
    //     contactList: [
    //       ...state.contactList,
    //       {
    //         name: action.payload.name,
    //         phoneNumber: action.payload.phoneNumber,
    //       },
    //     ],
    //   };

    default:
      return { ...state };
  }
}

export default reducer;
