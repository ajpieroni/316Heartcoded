import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useContext } from "react";

export const UserContext = React.createContext({
    user: {
      username: '',
      id: null,
      name: '',
      birthday: null,
      bio: '',
      gender: '',
      id: null,
      join_date: '',
      location: '',
      preferences: ''

    },
    setUser: () => {}
  });
  