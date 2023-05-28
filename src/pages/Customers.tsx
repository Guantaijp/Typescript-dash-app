import { useEffect, useState } from "react";
import { Avatar, Table } from "antd";

interface CustomerProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    address: string;
    city: string;
  };
  image: string;
}

interface ApiResponse {
  users: CustomerProps[];
}

const Customers = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<CustomerProps[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((json: ApiResponse) => {
        // console.log(json);
        setDataSource(json.users);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-xl mt-8 font-bold">Customers</h1>
      <Table
        loading={loading}
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (link: string) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "First Name",
            dataIndex: "firstName",
          },
          {
            title: "Last Name",
            dataIndex: "lastName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },
          {
            title: "Address",
            dataIndex: "address",
            render: (address: { address: string; city: string }) => {
              return (
                <span>
                  {address.address}, {address.city}
                </span>
              );
            },
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 8,
        }}
      ></Table>
    </div>
  );
};

export default Customers;
