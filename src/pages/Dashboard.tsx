import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, } from "antd";
import { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { type } from "os";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


interface OrderProps {
    id: number;
    title: string;
    price: number;
    discountPrice: number;
    quantity: number;
    total: number;
}

interface RevenueData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
}



interface ApiResponse {
    products: OrderProps[];
}

const Dashboard = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<number>(0);
    const [inventory, setInventory] = useState<number>(0);
    const [customers, setCustomers] = useState<number>(0);
    const [revenue, setRevenue] = useState<number>(0);
    const [recent, setRecent] = useState<OrderProps[]>([]);
    const [revenueData, setRevenueData] = useState<RevenueData>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        setLoading(true);
        fetch("https://dummyjson.com/carts/1")
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response data is an array of order objects
                setOrders(data.total);
                setRevenue(data.discountedTotal);
                setRecent(data.products.splice(0, 3));
                setLoading(false);
            })
        fetch("https://dummyjson.com/products")
            .then((response) => response.json())
            .then((data) => {
                setInventory(data.total);
                // console.log(data.total);
            })

        fetch("https://dummyjson.com/users")
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data.total);
                // console.log(data.total);
            });

        fetch("https://dummyjson.com/carts")
            .then((response) => response.json())
            .then((res) => {
                const labels = res.carts.map((cart: any) => {
                    return `User ${cart.userId}`;

                });
                const data = res.carts.map((cart: any) => {
                    return cart.discountedTotal;
                });
                const dataSource = {
                    labels,
                    datasets: [
                        {
                            label: "Revenue",
                            data: data,
                            backgroundColor: "blue"
                        },
                    ],
                };
                setRevenueData(dataSource);

            })
    }, []);

    const option = {
        responsive: true,
        Plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Order Revenue",
            },
        },
    }
        





    return (
        <div className="flex flex-col justify-center ">
            <h1 className="text-xl mt-8 font-bold">DashBoard</h1>

            <Space direction="horizontal">
                <Card
                    loading={loading}
                    title="Total Orders"
                    style={{ width: 200 }}
                >
                    <Space direction="horizontal">
                        <ShoppingCartOutlined
                            style={{
                                color: "blue",
                                backgroundColor: "rgba(0,0,255,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                        <Statistic

                            value={orders}
                        />
                    </Space>
                </Card>

                <Card
                    loading={loading}
                    title="Inventory"
                    style={{ width: 200 }}
                >
                    <Space direction="horizontal">
                        <ShoppingOutlined
                            style={{
                                color: "green",
                                backgroundColor: "rgba(0,0,430,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                        <Statistic
                            value={inventory}
                        />
                    </Space>
                </Card>

                <Card
                    loading={loading}
                    title="Customers"
                    style={{ width: 200 }}
                >
                    <Space direction="horizontal">
                        <UserOutlined
                            style={{
                                color: "purple",
                                backgroundColor: "rgba(0,255,255,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                        <Statistic
                            value={customers}
                        />
                    </Space>
                </Card>

                <Card
                    loading={loading}
                    title="Customers"
                    style={{ width: 200 }}
                >
                    <Space direction="horizontal">
                        <DollarCircleOutlined
                            style={{
                                color: "red",
                                backgroundColor: "rgba(255,0,0,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                        <Statistic
                            value={revenue}
                        />
                    </Space>
                </Card>
            </Space>

            <Space direction="horizontal">
            <div className="flex flex-col justify-center">
                <h1 className="text-xl mt-8 font-bold">Recent Orders</h1>
                <Table
                    loading={loading}
                    columns={[
                        {
                            title: "Title",
                            dataIndex: "title",
                        },
                        {
                            title: "Quantity",
                            dataIndex: "quantity",
                        },
                        {
                            title: "Price",
                            dataIndex: "discountedPrice",
                        },

                    ]}
                    dataSource={recent}
                    pagination={false}
                > </Table>

            </div>
            <div className="flex flex-col mt-8 justify-center">
                <Card style={{ width: 500, height: 250 }}>
                    <Bar 
                    options={option}
                    data={revenueData} 
                    />
                </Card>
            </div>
            </Space>
        </div>
    );
};

export default Dashboard;