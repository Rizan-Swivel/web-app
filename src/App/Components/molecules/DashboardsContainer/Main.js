import React from "react";

function Main(props) {
  const { children, crumbs } = props;
  return (
    <main className="h-full overflow-y-auto bg-gray-100 px-2 md:px-6">
      <div className="container w-full mx-auto pt-10">{children}</div>
    </main>
  );
}

export default Main;
