import React from "react";

import { UserProvider } from "./User";

const AppProvider: React.FC = ({ children }) => (
  <UserProvider>{children}</UserProvider>
);

export default AppProvider;
