import React from "react";
import { getUserBuilds } from "../../components/Api/Api";

const UserBuildPage: React.FC = () => {
  const [builds, setBuilds] = React.useState([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const result = getUserBuilds();
    result.then(
      function (res) {
        setBuilds(res);
      },
      function (err) {
        setError(true);
      }
    );
  }, builds);

  return <div>{error ? <div>Error</div> : <div>no error</div>}</div>;
};

export default UserBuildPage;
