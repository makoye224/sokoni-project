import { useSelector } from 'react-redux';

const UserInfo = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center">User Information</h1>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-10">
          <ol className="list-group">
            <li className="list-group-item">
              <strong>Name:</strong> {user && user.name}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {user && user.email}
            </li>
            <li className="list-group-item">
              <strong>User Type:</strong> {user && user.userType}
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
