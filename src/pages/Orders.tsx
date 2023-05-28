import { useEffect, useState } from "react";
import { Table } from "antd";

interface OrderProps {
    id: number;
    title: string;
    price: number;
    discountPrice: number;
    quantity: number;
    total: number;
}

interface ApiResponse {
    products: OrderProps[];
}


const Orders = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [dataSource, setDataSource] = useState<OrderProps[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch("https://dummyjson.com/carts/1")
            .then((response) => response.json())
            .then((json: ApiResponse) => {
                // console.log(json);
                setDataSource(json.products);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col justify-center ">
            < h1 className="text-xl mt-8 font-bold">Orders</h1>
            <Table
                loading={loading}
                columns={[
                    {
                        title: "Title",
                        dataIndex: "title",
                    },
                    {
                        title: "Price",
                        dataIndex: "price",
                        render: (value) => <span>{value} Ksh</span>,
                    },
                    {
                        title: "Discount Price",
                        dataIndex: "discountPrice",
                        render: (value) => <span>{value} Ksh</span>,
                    },
                    {
                        title: "Quantity",
                        dataIndex: "quantity",
                    },
                    {
                        title: "Total",
                        dataIndex: "total",
                        render: (value) => <span>{value} Ksh</span>,
                    },
                ]}
                dataSource={dataSource}
                rowKey="id"
                pagination={{
                    pageSize: 8
                }}
            />
        </div>
    );
}

export default Orders;
