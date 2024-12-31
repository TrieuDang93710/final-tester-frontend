import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';

function User() {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const rs = await axiosSecure.get('/user');
      return rs.data;
    }
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/user/admin/${user._id}`).then(() => {
      alert(`${user.name} is now admin`);
      refetch();
    });
  };

  const handleDeleteUser = (user) => {
    axiosSecure.delete(`/user/${user._id}`).then(() => {
      alert(`${user.name} is removed from database`);
      refetch();
    });
  };

  return (
    <div>
      <div className='flex items-center justify-between m-4'>
        <h5>All Users</h5>
        <h5>Total users: {users.length}</h5>
      </div>
      {/* table */}
      <div>
        <div className='overflow-x-auto'>
          <table className='table table-zebra md:w-[870px]'>
            {/* head */}
            <thead className='bg-green text-white rounded-lg'>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === 'admin' ? (
                      'Admin'
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className='btn btn-xs btn-circle bg-indigo-500 text-white'
                      >
                        <FaUsers />
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDeleteUser(user)} className='btn btn-xs bg-orange-500 text-white'>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
